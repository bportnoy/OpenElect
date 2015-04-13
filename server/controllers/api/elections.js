/**
 * Elections API Controller
 */

'use strict'

// Utilities
var _ = require('lodash');
var Promise = require('bluebird');

// DB models
var Election = require('../../database/models/election');
var Poll = require('../../database/models/poll');

Promise.promisifyAll(_);

var elections = {

  _checkForElection: function(id, req, res) {
    var election = new Election({id: id});
    return election.fetch()
      .then(function(election) {
        if ( election ) {
          return election;
        } else {
          res.status(404);
          req.send('Election object not found');
        }
      });
  },

  // create a new election entry ( POST /elections/create )
  create: function(req, res) {
    if ( req.body.election ) {
      var data = req.body.election;
      console.log(data);
      var election = new Election({
        name: data.name,
        description: data.description || 'no description',
        // start: data.start_date, //TODO re-enable this - we need to ensure consistent date/time formatting between back and front
        // end: data.end_date, 
        timed: data.is_timed,
        privacy_strategy: data.privacy_strategy,
        randomize_answer_order: data.randomize_questions,
        two_factor_auth: data.allow_2_auth,
        force_two_factor_auth: data.force_2_auth
      }).save()
      .then(function(model){
        res.status(201);
        res.json({
          id: model.get('id'),
          url: model.get('url_handle') || 'not yet supported', // todo: implement election short-urls
          name: model.get('name'),
          created_at: model.get('created_at')
        });
        res.end();
      }).error(function(error){
        res.status(500);
        console.error(error);
        res.end();
      });
    } else {
      res.status(400);
      res.end('Bad request');
    }
  },

  // election request method for administration ( GET /elections/update/:id )
  adminGetById: function(id, req, res) {
    var election = new Election({id: id});
    election.fetch()
      .then(function(election){
        if ( election ) {
          res.send(election.toJSON());
        } else {
          res.staus = 404;
          res.send();
        }
      });
  },

  // election update method for administration ( POST /elections/update/:id )
  updateById: function(id, req, res) {
    var data = req.body;
    var election = new Election({id: id});
    election.fetch()
      .then(function(election){
        if ( election ) {
          _(data).forEach(function(value, property){
            // check to make sure we aren't allowing admins to change important stuff
            if (  property !== 'id' 
                  && property !== 'created_ad' 
                  && property !== 'updated_at' 
                  && property !== 'results' // !!!! todo: more robust checking for rewrite fraud via API
                ) { 
                    election.set(property, value); 
                }
          });
          election.save().then(function(election){
            res.send(election.toJSON());
          });
        } else {
          res.status(404);
          res.end('Election object not found');
        }
      });
  },

  voterGetById: function(id, req, res) {
    var election = new Election({ id: id });
    election.fetch({
      withRelated: ['poll']
    })
    .then(function(election){
      if ( election ) {
        election.related('poll').load(['question'])
          .then(function(poll) {
            res.send(poll);
          });
      }
    });
  },

  // election request method for voters ( GET /elections/vote/:id )
  __voterGetById: function(id, req, res) { // potentially useful in future iterations, not currently in use
    var election = new Election({id: id});
    election.fetch({ 
      withRelated: ['poll'],
      columns: [
        'id',
        'name',
        'description',
        'start',
        'end',
        'accepting_votes',
        'url_handle',
        'randomize_answer_order',
        'results'
      ]
    })
    .then(function(election){
      if ( election ) {
        election.related('poll').load(['question'])
          .then(function(){
            res.send(election.toJSON());
          });
      } else {
        res.status(404);
        res.end('Election object not found');
      }
    });
  },

  // begin vote tabulation - admin only ( POST /elections/results/:id )
  tabulate: function(id, req, res) {
    var election = new Election({id: id});
    election.fetch()
      .then(function(election) {
        if ( election ) {
          election.tabulate()
            .then(function(election){
              res.json(election.get('results'));
            });
        } else {
          res.status(404);
          res.end('Election object not found');
        }
      });
  },

  // view vote results - accessible to all users ( GET /elections/results:id )
  getResultsById: function(id, req, res) {
    this._checkForElection(id, req, res)
      .then(function(election){
        res.json(election);
      });
  }


};

module.exports = elections;