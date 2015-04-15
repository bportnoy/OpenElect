'use strict';

var Dispatcher = require('../dispatchers/default');
var constants = require('../constants/ElectionConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var axios = require('axios');

var CHANGE_EVENT = constants.CHANGE_EVENT;


// Stored Elections Data
var _initialFetch = false;
var _elections = {};


// Get user elections and store 
function getElections(userId) {
	axios.get('/api/v1/elections/owner/' + userId )
    .then(function(response){
    	_initialFetch = true;
    	if ( response.data.length > 0 ) {
    		response.data.forEach(function(election) {
    			_elections[election.id] = election;
    		});
    	}
    })
    .catch(function(err){
    	console.error('Failed to connect to OpenElect Server');
    });
}

var ElectionStore = assign({}, EventEmitter.prototype, {
	
	emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  getCurrentUserElections: function() {
  	return _elections;
  },

  



});

ElectionStore.dispatcherToken = Dispatcher.register(function(action){
	
	switch(action.actionType) {
  
    case constants.GET_USER_ELECTIONS:
      getElections(action.userId);
      ElectionStore.emitChange();
    break;

    default: // no-op
  }

});

module.exports = ElectionStore;