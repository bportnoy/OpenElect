'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var API = require('../api');

var _ = require('underscore');


var ElectionActions = {
	createElection: function(options) {
		if ( !options ) {
			options = {};
		}
		_.defaults(options, {
			// owner_id: 1, todo: replace this with uuid
			name: 'New Election',
			description: 'Description'
		});

		API.createElection(options);
	},

	getUserElections: function(userId) {
		Dispatcher.dispatch({
			actionType: Constants.GET_USER_ELECTIONS,
			userId: userId
		});
	},

	setElectionData: function(keyOrObject, value) {
		var actionObj = {
			actionType: Constants.SET_ELECTION_DATA,
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