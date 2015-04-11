'use strict';

var Dispatcher = require('../dispatchers/default');
var BallotConstants = require('../constants/BallotConstants');
var EventEmitter = require('events').EventEmitter;

var BallotActions = {

  select: function (questionId, selectionId){
    Dispatcher.dispatch({
      actionType: BallotConstants.OPTION_SELECT,
      id: questionId,
      selection: selectionId
    });
  },

  deselect: function(questionId, selectionId){
    Dispatcher.dispatch({
      actionType: BallotConstants.OPTION_DESELECT,
      id: questionId,
      selection: selectionId
    });
  },

  addQuestion: function(id){ //TODO: add max selections
    Dispatcher.dispatch({
      actionType: BallotConstants.QUESTION_ADD,
      id: id
    });
  },

  setUserAndElection: function(userId, electionId){
    Dispatcher.dispatch({
      actionType: BallotConstants.SET_USER_ELECTION,
      userId: userId,
      electionId: electionId
    });
  },

  submitBallot: function(){
    Dispatcher.dispatch({
      actionType: BallotConstants.SUBMIT_BALLOT
    });
  }

};

module.exports = BallotActions;