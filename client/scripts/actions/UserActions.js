'use strict';

var request = require('superagent');

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants').user;
var EventEmitter = require('events').EventEmitter;

var UserActions = {

  // checkLoggedIn: function() {
  //   request.get('/api/v1/users/checkLoggedIn')
  //   .end(function(err, res){
  //     Dispatcher.dispatch({
  //       actionType: Constants.UPDATE_LOGGED_IN,
  //       status: res.status === 200 ? true : false
  //     });
  //   });
  // }
  
};

module.exports = UserActions;