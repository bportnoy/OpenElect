'use strict';

var Dispatcher = require('../dispatchers/default');
var ElectionConstants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');


var ElectionActions = {
	
	getUserElections: function(userId) {
		Dispatcher.dispatch({
			actionType: ElectionConstants.GET_USER_ELECTIONS,
			userId: userId
		});
	},

	setElectionData: function(keyOrObject, value) {
		var actionObj = {
			actionType: ElectionConstants.SET_ELECTION_DATA,
			data: {}
		};
		
		if (typeof keyOrObject === 'string') {
			actionObj.data[keyOrObject] = value;
		} else if (typeof keyOrObject === 'object' ) {
			actionObj.data = keyOrObject;
		}

		Dispatcher.dispatch(actionObj);
	}

};

module.exports = ElectionActions;