'use strict';

var request = require('superagent');
var Bluebird = require('bluebird');

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants').user;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = Constants.CHANGE_EVENT;


//logged in user
var _currentUser;

var UserStore = assign({}, EventEmitter.prototype, {

  checkLoggedIn: function() {
    return new Bluebird(function(resolve, reject){
      request.get('/api/v1/users/checkLoggedIn')
      .end(function(err, res){
        _currentUser = res.body;
        if (res.status === 200){
          resolve(true);
          UserStore.emitChange();
        } else {
          resolve(false);
          _currentUser = undefined;
        }
      });
    });

  },

  getUserId: function(){
    return _currentUser.id;
  },

  getUser: function(){
    return _currentUser;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});

UserStore.dispatcherToken = Dispatcher.register(function(action){

  
  switch(action.actionType) {

    // case Constants.UPDATE_LOGGED_IN:
    //   updateLoggedIn(action.status);
    //   UserStore.emitChange();
    // break;


    default: // no-op
  }

});

module.exports = UserStore;
