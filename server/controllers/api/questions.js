/**
 * Questions API Controller
 */

'use strict'

var Question = require('../../database/models/question');
var uuid = require('uuid');

var questions = {
	
	create: function ( req, res ) {
		if ( req.body.question ) {
      var data = req.body.question;
      var options = req.body.question.options;
      console.log(data);
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

	adminGetById: function ( id, req, res ) {

	},
	
	updateById: function ( id, req, res ) {

	}

};

module.exports = questions;