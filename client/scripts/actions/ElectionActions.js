'use strict';

var Dispatcher = require('../dispatchers/default');
var ElectionConstants = require('../constants/ElectionConstants');
var EventEmitter = require('events').EventEmitter;


var ElectionActions = {
	
	getUserElections: function(userId) {
		Dispatcher.dispatch({
			actionType: ElectionConstants.GET_USER_ELECTIONS,
			userId: userId
		});
	},



};

module.exports = ElectionActions;