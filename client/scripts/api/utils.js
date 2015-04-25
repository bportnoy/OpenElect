'use strict';
var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants');

var request = require('superagent');

var _pendingRequests = {};
var API_URL = '/api/v1';
var TIMEOUT = 10000;

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

function abortPendingRequests(key) {
  if (_pendingRequests[key]) {
      _pendingRequests[key]._callback = function(){};
      _pendingRequests[key].abort();
      _pendingRequests[key] = null;
  }
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

var utils = {

  makeUrl: function(part) {
      return API_URL + part;
  },

  dispatchGet: function(key, url, params) {
    abortPendingRequests(key);
    dispatch(key, Constants.request.PENDING, params);
    _pendingRequests[key] = get(url).end(
      makeDigest(key, params)
    );
  },

  dispatchPost: function(key, url, data) {
    abortPendingRequests(key);
    dispatch(key, Constants.request.PENDING, data);
    _pendingRequests[key] = post(url, data).end(
      makeDigest(key, data)
    );
  }

};

module.exports = utils;