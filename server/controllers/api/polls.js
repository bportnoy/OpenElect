/**
 * Polls API Controller
 */

'use strict'

var Poll = require('../../database/models/poll');
var uuid = require('uuid');
var _ = require('lodash');

var polls = {

	create: function (req, res) {
		if ( req.body ) {
      var data = req.body.poll;
      var poll = new Poll({
        id: uuid.v4(),
        name: data.name,
        election_id: data.election_id,
        group_id: data.group_id
      }).save({},{method: 'insert'})
      .then(function(model){
        res.status(201);
        res.json({
          id: model.get('id'),
          election_id: model.get('election_id'),
          group_id: model.get('group_id'),
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

	adminGetById: function (id, req, res) {
    if( req.body){
      var data = req.body;
      var poll = new Poll({id: id})
          .fetch()
          .then(function(model){
            res.status(200);
            res.json({
              id: model.get('id'),
              election_id: model.get('election_id'),
              group_id: model.get('group_id'),
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

	updateById: function (id, req, res) {
    var data = req.body;
    var poll = new Poll({id: id});
    poll.fetch({withRelated: ['election']})
      .then(function(poll){
        if(poll){
          if (!poll.related(['election']).get('accepting_votes') || !poll.related(['election']).get('locked')){
            _(data).forEach(function(value, property){
              // check to make sure we aren't allowing admins to change important stuff
              if (  property !== 'id'
                    && property !== 'created_at'
                    && property !== 'updated_at'
                    && property !== 'election_id'
                  ) {
                      poll.set(property, value);
                  }
            });
            poll.save().then(function(poll){
              res.send(poll.toJSON({shallow: true}));
            });
          } else{
            res.status(401).send('You cannot edit a poll once the election has been opened.');
          }
        } else {
          res.status(404);
          res.end('Poll object not found');
        }
      });
  },

  getByElectionId: function(id, req, res) {
    var poll = new Poll()
      poll.where({ election_id: id })
        .fetchAll()
        .then(function(collection){
          res.status(200);
          res.send(collection.toJSON());
      }).error(function(error){
        res.status(500);
          console.error(error);
        res.end();
      });
  }

};

module.exports = polls;
