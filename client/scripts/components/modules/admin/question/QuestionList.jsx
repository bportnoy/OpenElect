'use strict';

var React = require('react');
var _ = require('underscore');

var QuestionListItem = require('./QuestionListItem.jsx');

var QuestionList = React.createClass({

	questions: function() {
		var list = [];
		_.each(this.props.questions, function(poll) {
			list.push( <PollListItem poll={poll} key={poll.id}/> );
		});
		return list;
	},

	render: function() {
		return (
			<ul className="poll-list">
				{this.questions()}
			</ul>
		);
	}
});

module.exports = QuestionList;