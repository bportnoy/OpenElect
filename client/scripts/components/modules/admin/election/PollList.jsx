'use strict';

var React = require('react');
var _ = require('underscore');

var PollListItem = require('./PollListItem.jsx');

var PollList = React.createClass({
	render: function() {
		var polls = function(){
			var list;
			_.each(this.props.polls, function(poll) {
				list.push( <PollListItem data={poll} /> );
			});
			return list;
		};
		return (
			<ul className="poll-list">
				{polls}
			</ul>
		);
	}
});

module.exports = PollList;