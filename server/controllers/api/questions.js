/**
 * Questions API Controller
 */

'use strict'

var Question = require('../../database/models/question');
var uuid = require('uuid');
var _ = require('lodash');

var questions = {

	create: function (req, res) {
		if ( req.body.question) {
      var data = req.body.question;
      var options = req.body.question.options;
      var question = new Question({
        id: uuid.v4(),
        poll_id: data.poll_id,
        name: data.name,
        description: data.description,
        options: JSON.stringify(options),
        count_strategy: data.count_strategy
      }).save({},{method: 'insert'})
      .then(function(model){
        res.status(201);
        res.json({
          id: model.get('id'),
          poll_id: model.get('poll_id'),
          name: model.get('name'),
          description: model.get('description'),
          options: model.get('options'),
          count_strategy: model.get('count_strategy'),
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

  getByPollId: function(id, req, res) {
    if ( id ) {
      var question = new Question();
      question.where({ poll_id: id })
      .fetchAll().then(function(collection){
        res.status(200);
        res.send(collection.toJSON());
      })
      .error(function(error){
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
    if(req.body){
      var data = req.body;
      var question = new Question({id: id})
        .fetch()
        .then(function(model){
          res.status(201);
          res.json({
            id: model.get('id'),
            poll_id: model.get('poll_id'),
            name: model.get('name'),
            description: model.get('description'),
            options: model.get('options'),
            count_strategy: model.get('count_strategy'),
            created_at: model.get('created_at')
          });
          res.end();
        }).error(function(error){
          res.status(500);
          console.error(error);
          res.send();
        });
    } else {
      res.status(400);
      res.end('Bad request');
    }
	},

	updateById: function (id, req, res) {
    var data = req.body;
    var question = new Question({id: id});
    question.fetch()
      .then(function(question){
        if(question){
          _(data).forEach(function(value, property){
            // check to make sure we aren't allowing admins to change important stuff
            if (  property !== 'id'
                  && property !== 'poll_id'
                  && property !== 'created_at'
                  && property !== 'updated_at'
                ) {
                    question.set(property, value);
                }
          });
          question.save().then(function(question){
            res.send(question.toJSON());
          });
        } else {
          res.status(404);
          res.end('Question object not found');
        }
      });
	}

};

module.exports = questions;
