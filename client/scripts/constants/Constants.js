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
  SET_ELECTION_DATA: null
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