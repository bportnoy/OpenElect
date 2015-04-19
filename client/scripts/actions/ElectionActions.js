'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var API = require('../api');

var ElectionStore = require('../stores/ElectionStore');

var _ = require('underscore');

function handleElectionData(keyOrObject, value) {
	var data = {};
	if (typeof keyOrObject === 'string') {
		data[keyOrObject] = value;
	} else if (typeof keyOrObject === 'object') {
		data = keyOrObject;
	}
	return data;
}

var ElectionActions = {

	// creates a new empty election object
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

	// fetches all elections belonging to the current user
	getUserElections: function() {
		API.getUserElections();
	},

	setCurrentElection: function(id) {
		API.getElectionById(id, true);
	},

	getElectionById: function(id) {
		API.getElectionById(id);
	},

	// posts new data to an election object - requires an id property within the data.election object
	postElectionData: function(keyOrObject, value) {
		var data = handleElectionData(keyOrObject, value);
		data.id = ElectionStore.getCurrentElectionData().id;

		API.postElectionData(data);
	},

	// update election data in-memory (no save to server)
	changeElectionData: function(keyOrObject, value) {
		var action = {
			actionType: Constants.admin.elections.CHANGE_ELECTION_DATA,
			data: handleElectionData(keyOrObject, value)
		};
		Dispatcher.dispatch(action);
	},

	// undo unsaved changes to the election
	undoElectionChange: function(keysOrString) {
		var action = {
			actionType: Constants.admin.elections.UNDO_ELECTION_CHANGE,
			keys: keysOrString
		};
		Dispatcher.dispatch(action);
	}

};

module.exports = ElectionActions;