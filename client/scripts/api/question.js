'use strict';

var Constants = require('../constants/Constants');
var utils = require('./utils.js');

var question = {
	
	create: function(data) {
    var url = utils.makeUrl('/questions/create');
    var key = Constants.request.questions.CREATE_QUESTION;
    utils.dispatchPost(key, url, data);
  },
  get: function(id) {
  	var url = utils.makeUrl('/questions/update/' + id);
  	var key = Constants.request.questions.GET_QUESTION;
  	utils.dispatchGet(key, url);
  },
  update: function(data) {
  	var url = utils.makeUrl('/questions/update/' + data.id);
  	var key = Constants.request.questions.UPDATE_QUESTION;
  	utils.dispatchPost(key, url, data);
  }

};

module.exports = question;