'use strict';

var Dispatcher = require('../dispatchers/default');
var constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var axios = require('axios');

var CHANGE_EVENT = constants.CHANGE_EVENT;


// Stored Elections Data
var _groups = {};
var _newest;
var _removeFirstRowFromCSVUpload = false;
var _showInviteBlock = false;
var _csvFilePath = '';
var _csvInProcess = false;



//namedFunctions
function beginCreate(){
  _newest = undefined;
  _removeFirstRowFromCSVUpload = false;
  _showInviteBlock = false;
  _csvInProcess = false;
}

function createGroup(name, id){
  _groups[id] = {name: name, id: id};
  _newest = id;
}

function toggleFirstRowStatus(){
  _removeFirstRowFromCSVUpload = !_removeFirstRowFromCSVUpload;
}

function toggleInviteBlock(){
  _showInviteBlock = !_showInviteBlock;
}


function checkCSVProcessStatus(){
  return axios.get('/api/v1/groups/csv/check/' + _newest)
  .then(function(response){
    return response.data.status;
  }).catch(function(error){console.error(error);});
}

function toggleCSVInProcess(){
  _csvInProcess = !_csvInProcess;
}

var GroupStore = assign({}, EventEmitter.prototype, {

  getNewest: function() {
    return _groups[_newest];
  },

  getFirstRowStatus: function() {
    return _removeFirstRowFromCSVUpload;
  },

  getInviteBlockStatus: function(){
    return _showInviteBlock;
  },

  pollCSVProcessStatus: function(){
    checkCSVProcessStatus().then(function(status){
      if (status){
        setTimeout(GroupStore.pollCSVProcessStatus, 1000);
      } else {
        _csvInProcess = false;
        toggleInviteBlock();
        GroupStore.emitChange();
      }
    });
  },

  getCSVProcessStatus: function(){
    return _csvInProcess;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

GroupStore.dispatcherToken = Dispatcher.register(function(action){

  switch(action.actionType) {

    case constants.CREATE_GROUP:
      createGroup(action.name, action.id);
      GroupStore.emitChange();
    break;

    case constants.BEGIN_GROUP_CREATE:
      beginCreate();
      GroupStore.emitChange();
    break;

    case constants.TOGGLE_FIRST_ROW_STATUS:
      toggleFirstRowStatus();
      GroupStore.emitChange();
    break;

    case constants.TOGGLE_GROUP_INVITE_BLOCK_STATUS:
      toggleInviteBlock();
      GroupStore.emitChange();
    break;

    case constants.PROCESSED_GROUP_CSV:
      toggleCSVInProcess();
      GroupStore.pollCSVProcessStatus();
      GroupStore.emitChange();
    break;

    default: // no-op
  }

});

module.exports = GroupStore;
