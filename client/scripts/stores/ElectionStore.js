'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../Constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = Constants.CHANGE_EVENT;


// Stored Elections Data
var _initialFetch = false;
var _elections = {};
var _currentElection = {
  'id': null,
  'owner_id': null,
  'name': null,
  'description': null,
  'start': null,
  'end': null,
  'timed': null,
  'accepting_votes': null,
  'locked': null,
  'privacy_strategy': null,
  'url_handle': null,
  'randomize_answer_order': null,
  'two_factor_auth': null,
  'force_two_factor_auth': null,
  'public_key': null,
  'results': null,
  'created_at': null,
  'updated_at': null
};

var _unsavedProperties = _.mapObject(_currentElection, function(val, key){
  return false;
});

var _currentElectionOriginal = {}; // todo: we'll store a fresh version of the election object here so the user may undo changes


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
  }

});

function setElectionData(data, unsaved) {
  _.extendOwn(_currentElection, data);
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
  _elections[data.id] = data;
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