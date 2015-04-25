'use strict';
var Dispatcher = require('./dispatchers/default');
var Constants = require('./constants/Constants');

var request = require('superagent');

var pollController = require('./api/poll');
var electionController = require('./api/election');

// API call definitions live here
var API = {

  election: electionController,
  poll: pollController

};

module.exports = API;
