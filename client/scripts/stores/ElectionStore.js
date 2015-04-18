'use strict';

var Dispatcher = require('../dispatchers/default');
var constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var axios = require('axios');
var _ = require('underscore');

var CHANGE_EVENT = constants.CHANGE_EVENT;


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

  getCurrentElectionData: function(keyOrObject, value) {
    return _currentElection;
  }

});

// Get user elections and store 
function getElections(userId) {
  axios.get('/api/v1/elections/owner/' + userId )
    .then(function(response){
      _initialFetch = true;
      if ( response.data.length > 0 ) {
        response.data.forEach(function(election) {
          _elections[election.id] = election;
        });
        ElectionStore.emitChange();
      }
    })
    .catch(function(err){
      console.error(err);
    });
}

function postElectionData(data) {
  console.log('post', data);
  axios.post('/api/v1/elections/update/' + data.id, data)
    .then(function(response) {
      _.extendOwn(_currentElection, response.data);
      console.log('response', response.data);
      ElectionStore.emitChange();
    })
    .catch(function(err){
      console.error(err);
    });
}

function setElectionData(data) {
  _.extendOwn(_currentElection, data);
  console.log(_currentElection);
  ElectionStore.emitChange();
}

function addUserElection(data) {
  _elections[data.id] = data;
  ElectionStore.emitChange();
}

ElectionStore.dispatcherToken = Dispatcher.register(function(action){
	
	switch(action.actionType) {
  
    case constants.GET_USER_ELECTIONS:
      getElections(action.userId);
    break;

    case constants.SET_ELECTION_DATA:
      setElectionData(action.data);
    break;

    case constants.request.elections.CREATE_ELECTION:
      if (action.response.body) {
        setElectionData(action.response.body);
        addUserElection(action.response.body);
      }
    break;

    default: // no-op

  }

});

module.exports = ElectionStore;