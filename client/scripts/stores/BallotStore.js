'use strict';

var Dispatcher = require('../dispatchers/default');
var constants = require('../constants/BallotConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var assign = require('object-assign');
var axios = require('axios');
var CHANGE_EVENT = constants.CHANGE_EVENT;

var _questions = {};
var _userId = null;
var _electionId = null;
var _successfulSubmit = false;
var _receipt = null;

function add (id) {
  _questions[id] = {question_id: id, selection: null};
}

function setUserElection(userId, electionId){
  _userId = userId;
  _electionId = electionId;
  console.log('uid: ' + _userId + ' eid: ' + _electionId);
}

function changeSelection (id, selection) {
    _questions[id].selection = selection;
}

function sendBallot(){
  var ballotToSend = {
    election_id: _electionId,
    user_id: _userId,
    response: {
      selections: []
    }
  };

  _.each(_questions, function(question){
    ballotToSend.response.selections.push(question);
  });

  // axios.post('/api/v1/ballots/create', {
  //   ballot: ballotToSend
  // }).then(function(response){
  //   _successfulSubmit = true;
  //   _receipt = response.receipt;
  // });
  console.log(ballotToSend);
  _receipt = 'asd;flkje';
  _successfulSubmit = true;
}

var BallotStore = assign({}, EventEmitter.prototype, {

  getProgress: function() {
    var result = {questions: 0, selections: 0};
    _.each(_questions, function(question){
      result.questions++;
      if (question.selection !== null) {
        result.selections++;
      }
    });
    return result;
  },

  getSelected: function(questionId, selectionId) {
    return _questions[questionId].selection === selectionId;
  },

  checkSubmit: function () {
    return _successfulSubmit;
  },

  getReceipt: function () {
    return _receipt;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

BallotStore.dispatcherToken = Dispatcher.register(function(action){

    switch(action.actionType) {
      case constants.OPTION_SELECT:
        changeSelection(action.id, action.selection);
        BallotStore.emitChange();
      break;

      case constants.OPTION_DESELECT:
        if (_questions[action.id].selection === action.selection) {
          changeSelection(action.id, null);
        }
        BallotStore.emitChange();
      break;

      case constants.QUESTION_ADD:
        add(action.id);
        BallotStore.emitChange();
      break;

      case constants.SET_USER_ELECTION:
        setUserElection(action.userId, action.electionId);
        BallotStore.emitChange();
      break;

      case constants.SUBMIT_BALLOT:
        sendBallot(action.electionId, action.userId);
        BallotStore.emitChange();
      break;

      default: //no op
    }

  });

module.exports = BallotStore;