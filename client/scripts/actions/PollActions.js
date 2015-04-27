'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var moment = require('moment');
var api = require('../api');

var PollStore = require('../stores/PollStore');

var _ = require('underscore');


var PollActions = {
  
  create: function(electionId) {
  	var data = {
  		poll: {
  			election_id: electionId
  		}
  	};
  	var defaults = {
  		name: 'New Poll',
  		group_id: null
  	};
  	data.poll = _.defaults(data.poll, defaults);
  	api.poll.create(data);
  },

  get: function(id) {
    api.poll.get(id);
  },

  update: function(data) {
    api.poll.update(data);
  },

  setProperty: function(property, value) {
    var action = {
      actionType: Constants.admin.polls.SET_POLL_PROPERTY,
      data: {
        property: property, 
        value: value
      }
    };
    Dispatcher.dispatch(action);
  },

  saveProperty: function(property) {
    var data = {
      id: PollStore.getCurrentProperty('id')
    };
    data[property] = PollStore.getCurrentProperty(property);
    this.update(data);
  },

  getQuestions: function(id) {
    api.poll.getQuestions(id);
  },

  addQuestion: function(pollId) {
    api.question.create(pollId);
  }

};


module.exports = PollActions;
