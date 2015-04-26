'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var moment = require('moment');
var api = require('../api');

var ElectionStore = require('../stores/ElectionStore');
var electionObj = require('../stores/emptyElectionObject');

var _ = require('underscore');


var PollActions = {
  
  create: function(electionId) {
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
  	api.poll.create(data);
  },

  get: function(id) {
    api.poll.get(id);
  },

  update: function(data) {
    api.poll.update(data);
  }

};


module.exports = PollActions;
