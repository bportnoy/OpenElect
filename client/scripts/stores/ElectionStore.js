'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var moment = require('moment');
var _ = require('underscore');

var CHANGE_EVENT = Constants.CHANGE_EVENT;


// Stored Elections Data
var _initialFetch = false;
var _elections = {};
var _currentElection = require('./emptyElectionObject');
var _currentElectionPolls = [];

var _unsavedProperties = _.mapObject(_currentElection, function(val, key){
  return false;
});

var _currentElectionOriginal = {};


var ElectionStore = assign({}, EventEmitter.prototype, {
	
	emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  currentUserElections: function() {
  	return _elections;
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCurrentElectionData: function() {
    return _currentElection;
  },

  isUnsavedProperty: function(property) {
    if ( _unsavedProperties[property] === true ) {
      return true;
    } else {
      return false;
    }
  },

  getElectionStart: function() {
    if ( typeof _currentElection.start === 'string' ){
      return moment.utc(_currentElection.start);
    }
    return _currentElection.start;
  },

  getElectionEnd: function() {
    if ( typeof _currentElection.end === 'string' ){
      return moment.utc(_currentElection.end);
    }
    return _currentElection.end;
  },

  getElectionPolls: function() {
    return _currentElectionPolls;
  }

});

function convertDates(data) {
  if ( data.start || data.end ) { // convert timestamps to moment objects 
    if ( typeof data.start === 'string' ) {
      data.start = moment.utc(data.start);
    }
    if ( typeof data.start === 'string' ) {
      data.end = moment.utc(data.end);
    }
  }
  return data;
}

function setElectionData(data, unsaved) {
  data = _.pick(data, _.keys(_currentElection)); // only set data that's supposed to go in the election object
  _.extendOwn(_currentElection, data);
  data = convertDates(data);
  if ( unsaved ) {
    _.each(data, function(value, key) {
      _unsavedProperties[key] = true;
    });
  } else {
    _.each(data, function(value, key) {
      _unsavedProperties[key] = false;
      _currentElectionOriginal[key] = value;
    });
  }
  ElectionStore.emitChange();
}

function undoChanges(keys) {
  if ( typeof keys === 'string' ) {
    _currentElection[keys] = _currentElectionOriginal[keys];
  } else {
    _.each(keys, function(value, key) {
      _currentElection[key] = _currentElectionOriginal[key];
    });
  }
  ElectionStore.emitChange();
}

function addUserElection(data) {
  data = convertDates(data);
  _elections[data.id] = data;
  ElectionStore.emitChange();
}

function addPoll(data) {
  _currentElectionPolls.push(data);
  ElectionStore.emitChange();
}

ElectionStore.dispatcherToken = Dispatcher.register(function(action){

	switch(action.actionType) {
  
    case Constants.request.elections.GET_USER_ELECTIONS:
      if (action.response === 'PENDING') {
        console.log('request sent');
      } else {
        if (action.response.body) {
          action.response.body.forEach(function(election){
            addUserElection(election);
          });
        } else {
          console.error('unexpected response from server: ', action.response);
        }
      }
    break;

    case Constants.request.elections.SET_ELECTION_DATA:
      setElectionData(action.response.body);
    break;


    case Constants.request.elections.CREATE_ELECTION:
      if (action.response === 'PENDING') {
        console.log('request sent');
      } else {
        if (action.response.body) {
          setElectionData(action.response.body);
          addUserElection(action.response.body);
        } else {
          console.error('unexpected response from server: ', action.response);
        }
      }
    break;

    case Constants.request.elections.POST_ELECTION_DATA:
      if (action.response === 'PENDING') {
        console.log('request sent');
      } else {
        if (action.response.body) {
          setElectionData(action.response.body);
        } else {
          console.error('unexpected response from server: ', action.response);
        }
      }
    break;

    case Constants.request.polls.CREATE_POLL:
      if (action.response === 'PENDING') {
        console.log('request sent');
      } else {
        if (action.response.body) {
          addPoll(action.response.body);
        } else {
          console.error('unexpected response from server: ', action.response);
        }
      }
    break;


    // updates election data but does not post to server
    case Constants.admin.elections.CHANGE_ELECTION_DATA:
      setElectionData(action.data, true);
    break;

    // undo unsaved changes to an election
    case Constants.admin.elections.UNDO_ELECTION_CHANGE:
      undoChanges(action.keys);
    break;

    default: // no-op

  }

});

module.exports = ElectionStore;