'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = Constants.CHANGE_EVENT;

var _currentPoll = {
  election_id: null,
  group_id: null,
  id: null,
  name: null,
  questions: {}
};

var PollStore = assign({}, EventEmitter.prototype, {

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
    
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getCurrent: function() {
    return _currentPoll;
  },

  getCurrentProperty: function(property) {
    return _currentPoll[property];
  },

  getQuestions: function() {
    return _currentPoll.questions;
  },

  getQuestion: function(id) {
    return _currentPoll.questions[id];
  },

  getQuestionProperty: function(id, property) {
    return _currentPoll.questions[id][property];
  }

});

function updatePollData(data) {
  _.extendOwn(_currentPoll, data);
  PollStore.emitChange();
}

function setCurrentProperty(property, value) {
  _currentPoll[property] = value;
  PollStore.emitChange();
}

function updatePollQuestion(id, data) {
  var question = {};
  question[data.property] = data.value;
  _.extend(_currentPoll.questions[id], question);
  PollStore.emitChange();
}

function updatePollQuestions(questions) {
  _.extend(_currentPoll.questions, questions);
  PollStore.emitChange();
}

function deletePollQuestion(id) {
  delete _currentPoll.questions[id];
  PollStore.emitChange();
}


PollStore.dispatcherToken = Dispatcher.register(function(action){

  var data;
  switch(action.actionType) {
    
    case Constants.request.polls.GET_POLL || Constants.request.polls.UPDATE_POLL:
      if (action.response === 'PENDING') {
        console.log(action.actionType);
      } else {
        if (action.response.body) {
          updatePollData(action.response.body);
        } else {
          console.error('unexpected response from server: ', action.response);
        }
      }
    break;

    case Constants.admin.polls.SET_POLL_PROPERTY:
      setCurrentProperty(action.data.property, action.data.value);
    break;

    case Constants.request.polls.GET_POLL_QUESTIONS:
      if (action.response === 'PENDING') {
        console.log(action.actionType);
      } else {
        if (action.response.body) {
          data = {};
          _.each(action.response.body, function(question){
            data[question.id] = question;
          });
          updatePollQuestions(data);
        } else {
          console.error('unexpected response from server: ', action.response);
        }
      }
    break;

    case Constants.request.questions.CREATE_QUESTION:
      if (action.response === 'PENDING') {
        console.log(action.actionType);
      } else {
        if (action.response.body) {
          updatePollQuestions([action.response.body]);
        } else {
          console.error('unexpected response from server: ', action.response);
        }
      }
    break;

    case Constants.admin.questions.SET_QUESTION_PROPERTY:
      updatePollQuestion(action.data.id, action.data);
    break;

    case Constants.request.questions.DELETE_QUESTION:
      if (action.response === 'PENDING') {
        console.log(action.actionType);
      } else {
        if (action.response.body) {
          deletePollQuestion(action.response.body.id);
        } else {
          console.error('unexpected response from server: ', action.response);
        }
      }
    break;
    
    default: // no op
  }

});


module.exports = PollStore;
