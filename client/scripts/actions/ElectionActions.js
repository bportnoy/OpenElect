'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var moment = require('moment');
var API = require('../api');

var ElectionStore = require('../stores/ElectionStore');
var electionObj = require('../stores/emptyElectionObject');

var _ = require('underscore');

function handleElectionData(keyOrObject, value) {
  var data = {};
  if (typeof keyOrObject === 'string') {
    data[keyOrObject] = value;
  } else if (typeof keyOrObject === 'object') {
    data = keyOrObject;
  }
  // check if we need to update the date objects
  if ( _.keys(
        _.pick(data, [ 'start_month', 'start_day', 'start_year', 'start_time', 'end_month', 'end_day', 'end_year', 'end_time' ])
      ).length > 0 ) {
    // get the current dates - these should be moment objects
    var current = {
      start: ElectionStore.getElectionStart(),
      end: ElectionStore.getElectionEnd()
    };
    // for date changes in the data, update the moment objects and save them
    _.each(data, function(value, key){
      var startOrEnd = key.split('_')[0];
      var part = key.split('_')[1];
      current[startOrEnd][part](parseInt(value));
      data.start = current.start;
      data.end = current.end;
    });
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
      description: 'Description',
      start_date: moment.utc().toISOString(),
      end_date: moment.utc().add(1, 'days').toISOString()
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

  getElectionPolls: function(id) {
    API.getPollsByElectionId(id);
  },

  // posts new data to an election object - requires an id property within the data.election object
  postElectionData: function(keyOrObject, value) {
    var data = handleElectionData(keyOrObject, value);
    data = _.pick(data, _.keys(electionObj)); // normalize object to match api
    if ( _.keys(data).length > 0 ) {
      if ( data.start || data.end ) { // check to convert dates to strings
        if ( data.start === 'object' ) {
          data.start = moment.utc().toISOString();
        }
        if ( data.end === 'object' ) {
          data.end = moment.utc().toISOString();
        }
      }
      data.id = ElectionStore.getCurrentElectionData().id;
      API.postElectionData(data);
    }
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