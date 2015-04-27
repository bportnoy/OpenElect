'use strict';

var React = require('react');
var _ = require('underscore');

var QuestionListItem = require('./QuestionListItem.jsx');
var PollActions = require('../../../../actions/PollActions');
var QuestionActions = require('../../../../actions/QuestionActions');
var PollStore = require('../../../../stores/PollStore')

var QuestionList = React.createClass({

	getInitialState: function () {
    return {
    	questions: {}
    };
  },

	componentDidMount: function() {
    PollStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PollStore.removeChangeListener(this._onChange);
  },

	questions: function() {
		var list = [];
		_.each(this.state.questions, function(question) {
			list.push( <QuestionListItem question={question} key={question.id}/> );
		});
		return list;
	},

	addQuestion: function() {
		QuestionActions.create(this.props.pollId);
	},

	_onChange: function() {
		var questions = PollStore.getQuestions();
		this.setState({
			questions: questions
		})
	},

	render: function() {
		var questions = this.questions();
		return (
			<div className="questions">
				<ul className="question-list">
					{questions}
				</ul>
				<button onClick={this.addQuestion}>Add a Question</button>
			</div>
		);
	}
});

module.exports = QuestionList;