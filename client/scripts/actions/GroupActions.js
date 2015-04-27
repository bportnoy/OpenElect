'use strict';

var axios = require('axios');
var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var GroupStore = require('../stores/GroupStore');
var _ = require('lodash');


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

  beginCreate: function(name) {
    Dispatcher.dispatch({
      actionType: Constants.BEGIN_GROUP_CREATE
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

  toggleInviteButtonStatus: function() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_GROUP_INVITE_BUTTON_STATUS
    });
  },

  togglePCBlockStatus: function() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_GROUP_PC_BLOCK_STATUS
    });
  },

  processCSV: function(path){
    var firstRowStatus = GroupStore.getFirstRowStatus();
    var id = GroupStore.getCreateStatus().group.id;
    axios.post('/api/v1/groups/csv/process', {
      removeFirst: firstRowStatus,
      id: id,
      path: path
    }).then(function(response){
      Dispatcher.dispatch({
        actionType: Constants.PROCESSED_GROUP_CSV,
        filePath: path
      });
    });
    // .catch(function(response){
    //   console.error(response);
    // });
  },

  getGroupList: function(asOwner, transitionCallback){
    console.log('get group list');
    asOwner = asOwner || false;
    axios.get('/api/v1/groups/list?own=' +asOwner.toString())
    .then(function(response){
      Dispatcher.dispatch({
        actionType: Constants.GET_GROUP_LIST,
        owner: asOwner,
        list: response.data
      });
      if (transitionCallback) {
        transitionCallback();
      }
    });
  },

  getUserList: function(id){
    axios.get('/api/v1/groups/' + id + '/users')
    .then(function(response){
      Dispatcher.dispatch({
        actionType: Constants.GROUP_USER_LIST_UPDATE,
        users: response.data
      });
    });
  },

  setActiveGroup: function(id){
    Dispatcher.dispatch({
      actionType: Constants.SET_ACTIVE_GROUP,
      id: id
    });
  },

  saveParentChild: function(id, parent, children, router){
    var childIds = children.map(function(child){
      return child.id;
    });
    var currentChildren = GroupStore.getGroup(id).children;
    var newChildren = _.union(childIds, currentChildren);
    axios.post('/api/v1/groups/update',
    {
      id: id,
      attributes: {
        parent_id: parent,
        children: childIds
      }
    }).then(function(response){
      Dispatcher.dispatch({
        actionType: Constants.SAVE_GROUP_PARENT_CHILD,
        group: response.data,
        router: router
      });
    });
  },

  removeUser: function(userId, groupId){
    axios.post('/api/v1/groups/users/remove', {
      user_id: userId,
      group_id: groupId
    }).then(function(response){
      console.log(response);
      Dispatcher.dispatch({
        actionType: Constants.GROUP_USER_LIST_UPDATE,
        users: response.data
      });
    });
  },

  updatePendingInvite: function(user){
    Dispatcher.dispatch({
      actionType: Constants.UPDATE_PENDING_INVITE,
      user: user
    });
  },

  sendPendingInvites: function(){
    var pending = GroupStore.getPendingInvitations();
    var users = _.map(pending, function(user){
      return user;
    });
    axios.post('/api/v1/groups/users/add',{
      groupId: GroupStore.getCreateStatus().group.id,
      users: users
    }).then(function(response){
      this.toggleInviteBlockStatus();
      this.togglePCBlockStatus();
      Dispatcher.dispatch({
        actionType: Constants.UPDATE_SINGLE_GROUP,
        group: response.data
      });
    }.bind(this));
  }

};

module.exports = GroupActions;
