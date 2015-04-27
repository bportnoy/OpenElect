'use strict';

var React = require('react');
var _ = require('underscore');

var QuestionListItem = require('./QuestionListItem.jsx');
var PollActions = require('../../../../actions/PollActions');
var QuestionActions = require('../../../../actions/QuestionActions');

var QuestionList = React.createClass({

	questions: function() {
		var list = [];
		_.each(this.props.questions, function(question) {
			list.push( <QuestionListItem question={questoin} key={question.id}/> );
		});
		return list;
	},

	addQuestion: function() {
		PollActions.addQuestion(this.props.pollId);
	},

	render: function() {
		var questions = this.questions();
		return (
			<div className="questions">
				<ul className="question-list">
					{this.questions}
				</ul>
				<button onClick={this.addQuestion}>Add a Question</button>
			</div>
		);
	}
});

module.exports = QuestionList;