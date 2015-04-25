'use strict';

var React = require('react');
var ElectionStore = require('../../../../stores/ElectionStore');
var ElectionActions = require('../../../../actions/ElectionActions');
var PollActions = require('../../../../actions/PollActions');
var PollStore = require('../../../../stores/PollStore');
var moment = require('moment');
var _ = require('underscore');


var PollAdmin = React.createClass({

	render: function() {
		return (
			<div>poll info will go here</div>
		);
	}

});

module.exports = PollAdmin;