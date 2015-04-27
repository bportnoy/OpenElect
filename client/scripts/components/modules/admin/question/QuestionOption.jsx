'use strict';

var React = require('react');
var _ = require('underscore');

var QuestionActions = require('../../../../actions/QuestionActions');

var QuestionOption = React.createClass({

	deleteOption: function() {
		QuestionActions.deleteOption(this.props.option.questionId, this.props.option.id);
	},

	render: function() {
		console.log('rendering option', this.props);
		var option = this.props.option;
		return (
			<li>
				{option.name}
			</li>
		);
	}

});

module.exports = QuestionOption;
