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
var _currentElection = {};


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
  postElectionData(_currentElection);
}

ElectionStore.dispatcherToken = Dispatcher.register(function(action){
	
	switch(action.actionType) {
  
    case constants.GET_USER_ELECTIONS:
      getElections(action.userId);
    break;

    case constants.SET_ELECTION_DATA:
      setElectionData(action.data);
    break;

    default: // no-op

  }

});

module.exports = ElectionStore;