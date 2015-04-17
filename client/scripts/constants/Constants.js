'use strict';

var keyMirror = require('keymirror');

module.exports = keyMirror({
  OPTION_SELECT: null,
  QUESTION_ADD: null,
  CHANGE_EVENT: null,
  SUBMIT_BALLOT: null,
  SET_USER_ELECTION: null,
  GET_USER_ELECTIONS: null,
  SAVE_GROUP_NAME: null,
  SET_ELECTION_DATA: null,
  CREATE_GROUP: null,
  CREATE_GROUP_NAME: null,
  BEGIN_GROUP_CREATE: null,
  TOGGLE_FIRST_ROW_STATUS: null,
  TOGGLE_GROUP_INVITE_BLOCK_STATUS: null,
  PROCESSED_GROUP_CSV: null
});

module.exports.request = keyMirror({
	TIMEOUT: null,
	ERROR: null,
	GET_ENTITY_DATA: null,
	PENDING: null
});

module.exports.request.elections = keyMirror({
	CREATE_ELECTION: null
});