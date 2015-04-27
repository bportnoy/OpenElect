'use strict';

var React = require('react');
var Link = require('react-router').Link;
var _ = require('underscore');

var QuestionActions = require('../../../../actions/PollActions');


var QuestionListItem = React.createClass({
	setPoll: function() {
		PollActions.get(this.props.poll.id);
	},
	render: function() {
		return (
			<li>
				<Link to='pollAdmin' onClick={this.setPoll} params={{ id: this.props.poll.id }} className="poll-name">{this.props.poll.name}</Link>
			</li>
		);
	}
});

module.exports = QuestionListItem;