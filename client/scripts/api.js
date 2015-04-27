'use strict';
var Dispatcher = require('./dispatchers/default');
var Constants = require('./constants/Constants');

var request = require('superagent');

var pollController = require('./api/poll');
var electionController = require('./api/election');
var questionController = require('./api/question');

// API call definitions live here
var API = {

  election: electionController,
  poll: pollController,
  question: questionController

};

module.exports = API;
