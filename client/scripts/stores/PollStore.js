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
  name: null
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
  }

});

function updatePollData(data) {
  _.extendOwn(_currentPoll, data);
  PollStore.emitChange();
}

PollStore.dispatcherToken = Dispatcher.register(function(action){

  switch(action.actionType) {
    
    case Constants.request.polls.GET_POLL:
      console.log(action);
      if (action.response === 'PENDING') {
        console.log('request sent');
      } else {
        if (action.response.body) {
          updatePollData(action.response.body);
        } else {
          console.error('unexpected response from server: ', action.response);
        }
      }
    break;

    default: // no op
  }

});


module.exports = PollStore;
