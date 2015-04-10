/**
 * API Controllers
 */

'use strict';

var settings = require('../config/env/default');

// endpoint controllers
var elections = require('./api/elections');

var api = {
	elections: elections,
	poll: function(req, res, next) {
	},
  ballot: function(req, res, next) {
  },
  question: function(req, res, next) {
  },
  user: function(req, res, next) {
  },
  group: function(req, res, next) {
  }
};


module.exports = api;