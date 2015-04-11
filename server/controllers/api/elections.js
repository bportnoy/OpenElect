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

  // create a new election entry ( POST /elections/create )
  create: function(req, res) {
    if ( req.body.election ) {
      var data = req.body.election;
      console.log(data);
      var election = new Election({
        name: data.name,
        description: data.description || 'no description',
        start: data.start_date,
        end: data.end_date,
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
    // todo: implement admin get methods
  },

  // election update method for administration ( POST /elections/update/:id )
  updateById: function(id, req, res) {
    // todo: write this
  },

  // election request method for voters ( GET /elections/vote/:id )
  voterGetById: function(id, req, res) {
    var election = new Election({id: id});
    election.fetch({ withRelated: ['poll'] })
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



}

module.exports = elections;