'use strict';

var Constants = require('../constants/Constants');
var utils = require('./utils.js');

var poll = {
	
	create: function(data) {
    var url = utils.makeUrl('/polls/create');
    var key = Constants.request.polls.CREATE_POLL;
    utils.dispatchPost(key, url, data);
  },
  get: function(id) {
  	var url = utils.makeUrl('/polls/update/' + id);
  	var key = Constants.request.polls.GET_POLL;
  	utils.dispatchGet(key, url);
  },
  update: function(data) {
  	var url = utils.makeUrl('/polls/update/' + data.id);
  	var key = Constants.request.polls.UPDATE_POLL;
  	utils.dispatchPost(key, url, data);
  },
  getQuestions: function(id) {
    var url = utils.makeUrl('/questions/poll/' + id);
    var key = Constants.request.polls.GET_POLL_QUESTIONS;
    utils.dispatchGet(key, url);
  }

};

module.exports = poll;