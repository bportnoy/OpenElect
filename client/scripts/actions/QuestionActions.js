'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var moment = require('moment');
var api = require('../api');

var PollStore = require('../stores/PollStore');

var _ = require('underscore');


var QuestionActions = {
  
  create: function(pollId) {
  	var data = {
  		question: {
  			poll_id: pollId
  		}
  	};
  	var defaults = {
  		name: 'New Question'
  	};
  	data.question = _.defaults(data.question, defaults);
  	api.question.create(data);
  },

  get: function(id) {
    api.question.get(id);
  },

  update: function(data) {
    api.question.update(data);
  },

  setProperty: function(id, property, value) {
    var action = {
      actionType: Constants.admin.questions.SET_QUESTION_PROPERTY,
      data: {
        id: id,
        property: property,
        value: value
      }
    };
    Dispatcher.dispatch(action);
  },

  saveProperty: function(id, property) {
    var data = {
      id: id
    };
    data[property] = PollStore.getQuestionProperty(id, property);
    this.update(data);
  }

};


module.exports = QuestionActions;
