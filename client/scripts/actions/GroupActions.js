'use strict';

var axios = require('axios');
var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var GroupStore = require('../stores/GroupStore');


var GroupActions = {

  createGroup: function(name) {
    axios.post('/api/v1/groups/create', {name: name})
    .then(function(response){
      Dispatcher.dispatch({
        actionType: Constants.CREATE_GROUP,
        name: response.data.name,
        id: response.data.id
      });
    }).catch(function(error){
      console.error(error);
    });
  },

  toggleFirstRowStatus: function(){
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_FIRST_ROW_STATUS
    });
  },

  toggleInviteBlockStatus: function() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_GROUP_INVITE_BLOCK_STATUS
    });
  },

  processCSV: function(path){
    var firstRowStatus = GroupStore.getFirstRowStatus();
    var id = GroupStore.getNewest().id;
    axios.post('/api/v1/groups/csv/process', {
      removeFirst: firstRowStatus,
      id: id,
      path: path
    }).then(function(response){
      Dispatcher.dispatch({
        actionType: Constants.PROCESSED_GROUP_CSV,
        filePath: path
      });
    })
    .catch(function(response){
      console.error(response);
    });
  }

};

module.exports = GroupActions;
