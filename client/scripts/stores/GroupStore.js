'use strict';

var Dispatcher = require('../dispatchers/default');
var constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var axios = require('axios');
var _ = require('lodash');


var CHANGE_EVENT = constants.CHANGE_EVENT;


// Stored Elections Data
var _groupsOwned = {}; //all groups user owns
var _current;
var _removeFirstRowFromCSVUpload = false;
var _showInviteBlock = false;
var _showInviteButtons = false;
var _showPCBlock = false;
var _csvFilePath = '';
var _csvInProcess = false;
var _groupsMember = {}; //all groups user is a member of
var _userList = [];
var _pendingInvites = {};


//wipes the slate clean as we start group creation
function beginCreate(){
  _current = undefined;
  _removeFirstRowFromCSVUpload = false;
  _showInviteBlock = false;
  _csvInProcess = false;
  _showInviteButtons = false;
  _showPCBlock = false;
  _userList = [];
  _pendingInvites = {};
}

function storeGroupList(list, owner){
  if (owner){
    list.forEach(function(group){
      _groupsOwned[group.id] = group;
    });
  } else {
    list.forEach(function(group){
      _groupsMember[group.id] = group;
    });
  }
}

function toggleInviteButtons() {
  _showInviteButtons = !_showInviteButtons;
}

function createGroup(name, id){
  _groupsOwned[id] = {name: name, id: id};
  _current = id;
  toggleInviteButtons();
}

function setActive(id){
  _userList = [];
  _current = id;
}

function toggleFirstRowStatus(){
  _removeFirstRowFromCSVUpload = !_removeFirstRowFromCSVUpload;
}

function toggleInviteBlock(){
  _showInviteBlock = !_showInviteBlock;
}

function togglePCBlock(){
  _showPCBlock = !_showPCBlock;
}

function checkCSVProcessStatus(){
  return axios.get('/api/v1/groups/csv/check/' + _current)
  .then(function(response){
    return response.data;
  }).catch(function(error){console.error(error);});
}

function toggleCSVInProcess(){
  _csvInProcess = !_csvInProcess;
}

function saveParentChild(group){
  _groupsOwned[group.id] = group;
}

function setUserList(list){
  _userList = list;
}

function updatePendingInvite(user){
  _pendingInvites[user.id] = user;
}

function updateGroup(group){
  _groupsOwned[group.id] = group;
}

var GroupStore = assign({}, EventEmitter.prototype, {

  getOwned: function(array) {
    if (array) {
      return _.map(_groupsOwned);
    }
    return _groupsOwned;
  },

  getMember: function(array) {
    if (array) {
      return _.map(_groupsMember);
    }
    return _groupsMember;
  },

  getGroup: function(id) {
    // debugger;
    if (_groupsOwned[id]) {
      return _groupsOwned[id];
    }
    if (_groupsMember[id]) {
      return _groupsMember[id];
    }
    return undefined;
  },

  getCreateStatus: function() {
    return {
      showButtons: _showInviteButtons,
      nameSelected: !!_current,
      showInviteBlock: _showInviteBlock,
      showPCBlock: _showPCBlock,
      group: _groupsOwned[_current],
      groups: _.map(_groupsOwned)
    };
  },

  getFirstRowStatus: function() {
    return _removeFirstRowFromCSVUpload;
  },

  getUserListForCurrent: function (){
    return _userList;
  },

  pollCSVProcessStatus: function(){
    checkCSVProcessStatus().then(function(status){
      if (status === true){
        setTimeout(GroupStore.pollCSVProcessStatus, 1000);
      } else {
        _groupsOwned[_current] = status;
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
  },

  getPendingInvitations: function() {
    return _pendingInvites;
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

    case constants.TOGGLE_GROUP_INVITE_BUTTON_STATUS:
      toggleInviteButtons();
      GroupStore.emitChange();
    break;

    case constants.TOGGLE_GROUP_INVITE_BLOCK_STATUS:
      toggleInviteBlock();
      GroupStore.emitChange();
    break;

    case constants.TOGGLE_GROUP_PC_BLOCK_STATUS:
      togglePCBlock();
      GroupStore.emitChange();
    break;

    case constants.PROCESSED_GROUP_CSV:
      toggleCSVInProcess();
      GroupStore.pollCSVProcessStatus();
      GroupStore.emitChange();
    break;

    case constants.GET_GROUP_LIST:
      storeGroupList(action.list, action.owner);
      GroupStore.emitChange();
    break;

    case constants.SAVE_GROUP_PARENT_CHILD:
      saveParentChild(action.group);
      action.router.transitionTo('groupAdmin', {id: action.group.id});
    break;

    case constants.SET_ACTIVE_GROUP:
      setActive(action.id);
      GroupStore.emitChange();
    break;

    case constants.GROUP_USER_LIST_UPDATE:
      setUserList(action.users);
      GroupStore.emitChange();
    break;

    case constants.UPDATE_PENDING_INVITE:
      updatePendingInvite(action.user);
      GroupStore.emitChange();
    break;

    case constants.UPDATE_SINGLE_GROUP:
      updateGroup(action.group);
      GroupStore.emitChange();
    break;


    default: // no-op
  }

});

module.exports = GroupStore;
