/**
 * API Controllers
 */

'use strict';

var settings = require('../config/env/default');

// endpoint controllers
var elections = require('./api/elections');

var api = { // an object to contain all response handlers
  elections: elections,
  poll: null, // todo: create controllers
  ballot: null, // todo: create controllers
  question: null, // todo: create controllers
  user: null, // todo: create controllers
  group: null // todo: create controllers
};


module.exports = api;