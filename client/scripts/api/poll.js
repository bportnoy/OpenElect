'use strict';

var Constants = require('../constants/Constants');
var utils = require('./utils.js');

var poll = {
	create: function(data) {
    var url = utils.makeUrl('/polls/create');
    var key = Constants.request.polls.CREATE_POLL;
    utils.dispatchPost(key, url, data);
  }
};

module.exports = poll;