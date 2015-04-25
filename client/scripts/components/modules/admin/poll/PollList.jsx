'use strict';

var React = require('react');
var _ = require('underscore');

var PollListItem = require('./PollListItem.jsx');

var PollList = React.createClass({

	polls: function() {
		var list = [];
		_.each(this.props.polls, function(poll) {
			list.push( <PollListItem poll={poll} key={poll.id}/> );
		});
		return list;
	},

	render: function() {
		return (
			<ul className="poll-list">
				{this.polls()}
			</ul>
		);
	}
});

module.exports = PollList;