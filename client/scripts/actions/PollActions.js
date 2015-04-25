'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var moment = require('moment');
var API = require('../api');

var ElectionStore = require('../stores/ElectionStore');
var electionObj = require('../stores/emptyElectionObject');

var _ = require('underscore');


var PollActions = {
  createPoll: function(electionId) {
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
  	API.poll.create(data);
  },

  updatePoll: function(data) {

  },

  setCurrentPoll: function(pollId) {

  }
};


module.exports = PollActions;
