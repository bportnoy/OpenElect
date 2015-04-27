'use strict';

var Constants = require('../constants/Constants');
var utils = require('./utils.js');
var UserStore = require('../stores/UserStore');

// stub to simulate missing module - todo: make this module!

var election = {
	createElection: function(data) {
    var url = utils.makeUrl('/elections/create');
    var key = Constants.request.elections.CREATE_ELECTION;
    var electionData = {election: data};
    utils.dispatchPost(key, url, electionData);
  },

  getUserElections: function() {
    var url = utils.makeUrl('/elections/owner/' + UserStore.getUserId());
    var key = Constants.request.elections.GET_USER_ELECTIONS;
    var params = {/*user: token */}; // todo: enable user auth
    utils.dispatchGet(key, url, params);
  },

  getElectionById: function(id, setAsCurrent) {
    var url = utils.makeUrl('/elections/update/' + id), key;
    if ( setAsCurrent ) {
      key = Constants.request.elections.SET_ELECTION_DATA;
    } else {
      key = Constants.request.elections.GET_ELECTION;
    }
    var params = {/*user: token */}; // todo: enable user auth
    utils.dispatchGet(key, url, params);
  },

  getPollsByElectionId: function(id) {
    var url = utils.makeUrl('/polls/election/' + id);
    var key = Constants.request.elections.GET_ELECTION_POLLS;
    utils.dispatchGet(key, url);
  },

  postElectionData: function(data) {
    var url = utils.makeUrl('/elections/update/' + data.id);
    var key = Constants.request.elections.POST_ELECTION_DATA;
    utils.dispatchPost(key, url, data);
  }
};

module.exports = election;