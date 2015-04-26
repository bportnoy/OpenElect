'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var moment = require('moment');
var _ = require('underscore');

var CHANGE_EVENT = Constants.CHANGE_EVENT;

var PollStore = assign({}, EventEmitter.prototype, {
	
});

module.exports = PollStore;