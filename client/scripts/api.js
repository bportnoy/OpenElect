'use strict';
var Dispatcher = require('./dispatchers/default');
var Constants = require('./constants/Constants');

var request = require('superagent');

// stub to simulate missing module - todo: make this module!
var UserStore = {
  userId: function() {
    return 1;
  }
};

var API_URL = '/api/v1';
var TIMEOUT = 10000;

var _pendingRequests = {};

function abortPendingRequests(key) {
  if (_pendingRequests[key]) {
      _pendingRequests[key]._callback = function(){};
      _pendingRequests[key].abort();
      _pendingRequests[key] = null;
  }
}

// function token() {
//     return UserStore.getState().token;     todo: implement this
// }

function makeUrl(part) {
    return API_URL + part;
}

function dispatch(key, response, params) {
  var payload = {actionType: key, response: response};
  if (params) {
      payload.queryParams = params;
  }
  Dispatcher.dispatch(payload);
}

function makeDigest(key, params) {
  return function (err, res) {
    if (err && err.timeout === TIMEOUT) {
        dispatch(key, Constants.request.TIMEOUT, params);
    // } else if (res.status === 400) {
        // UserActions.logout();          todo: implement this
    } else if (!res.ok) {
        dispatch(key, Constants.request.ERROR, params);
    } else {
        dispatch(key, res, params);
    }
  };
}

// a get request with an authtoken param
function get(url) {
  return request
        .get(url)
        .timeout(TIMEOUT)
        .query(/*{authtoken: token()}*/);
}

function post(url, data) {
  return request
        .post(url)
        .send(data)
        .timeout(TIMEOUT)
        .query();
}

function dispatchGet(key, url, params) {
  abortPendingRequests(key);
  dispatch(key, Constants.request.PENDING, params);
  _pendingRequests[key] = get(url).end(
    makeDigest(key, params)
  );
}

function dispatchPost(key, url, data) {
  abortPendingRequests(key);
  dispatch(key, Constants.request.PENDING, data);
  _pendingRequests[key] = post(url, data).end(
    makeDigest(key, data)
  );
}

// API call definitions live here
var API = {

  createElection: function(data) {
    var url = makeUrl('/elections/create');
    var key = Constants.request.elections.CREATE_ELECTION;
    var electionData = {election: data};
    dispatchPost(key, url, electionData);
  },

  getUserElections: function() {
    var url = makeUrl('/elections/owner/' + UserStore.userId());
    var key = Constants.request.elections.GET_USER_ELECTIONS;
    var params = {/*user: token */}; // todo: enable user auth
    dispatchGet(key, url, params);
  },

  getElectionById: function(id, setAsCurrent) {
    var url = makeUrl('/elections/update/' + id), key;
    if ( setAsCurrent ) {
      key = Constants.request.elections.SET_ELECTION_DATA;
    } else {
      key = Constants.request.elections.GET_ELECTION;
    }
    var params = {/*user: token */}; // todo: enable user auth
    dispatchGet(key, url, params);
  },

  getPollsbyElectionId: function(id) {
    var url = makeUrl('/polls/election/' + id);
    var key = Constants.request.elections.GET_ELECTION_POLLS;
  },

  postElectionData: function(data) {
    var url = makeUrl('/elections/update/' + data.id);
    var key = Constants.request.elections.POST_ELECTION_DATA;
    dispatchPost(key, url, data);
  },

  createPoll: function(data) {
    var url = makeUrl('/polls/create');
    var key = Constants.request.polls.CREATE_POLL;
    dispatchPost(key, url, data);
  }

};

module.exports = API;
