'use strict';

var keyMirror = require('keymirror');

// Global constants
var Constants = keyMirror({
	OPTION_SELECT: null,
  OPTION_DESELECT: null,
  QUESTION_ADD: null,
  CHANGE_EVENT: null,
  BALLOT_ACCEPTED: null,
  SAVE_ELECTION: null,
  SET_USER_ELECTION: null,
  GET_USER_ELECTIONS: null,
  SAVE_GROUP_NAME: null,
  SET_ELECTION_DATA: null,
  CREATE_GROUP: null,
  CREATE_GROUP_NAME: null,
  BEGIN_GROUP_CREATE: null,
  TOGGLE_FIRST_ROW_STATUS: null,
  TOGGLE_GROUP_INVITE_BLOCK_STATUS: null,
  PROCESSED_GROUP_CSV: null,
  GET_GROUP_LIST: null,
  TOGGLE_GROUP_INVITE_BUTTON_STATUS: null,
  TOGGLE_GROUP_PC_BLOCK_STATUS: null,
  SAVE_GROUP_PARENT_CHILD: null,
  SET_ACTIVE_GROUP: null,
  GROUP_USER_LIST_UPDATE: null,
  UPDATE_PENDING_INVITE: null,
  UPDATE_SINGLE_GROUP: null
});

// Admin constants
Constants.admin = keyMirror({

});

Constants.user = keyMirror({
  UPDTATE_LOGGED_IN: null
});

// Election related constants
Constants.admin.elections = keyMirror({
  CHANGE_ELECTION_DATA: null,
  UNDO_ELECTION_CHANGE: null
});

// API related constants
Constants.request = keyMirror({
	TIMEOUT: null,
	ERROR: null,
	GET_ENTITY_DATA: null,
	PENDING: null
});

// API election constants
Constants.request.elections = keyMirror({
  CREATE_ELECTION: null,
  GET_USER_ELECTIONS: null,
  POST_ELECTION_DATA: null,
  SET_ELECTION_DATA: null,
  GET_ELECTION_POLLS: null
});

Constants.request.polls = keyMirror({
  CREATE_POLL: null
});

module.exports = Constants;