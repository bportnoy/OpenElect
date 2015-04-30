'use strict';

var React = require('react/addons');
var _ = require('underscore');

var QuestionActions = require('../../../../actions/QuestionActions');

var QuestionOption = React.createClass({

	mixins: [React.addons.LinkedStateMixin],

	deleteOption: function() {
		QuestionActions.deleteOption(this.props.option.questionId, this.props.option.id);

	},

	saveOption: function(e){
		e.preventDefault();
		var data = {id: this.props.option.id, name: this.state.name};
		QuestionActions.updateOption(this.props.questionId, data);
	},

	getInitialState: function(){
		return {name: this.props.option.name};
	},

	render: function() {
		var option = this.props.option;
		return (
			<li>
				<input valueLink={this.linkState('name')}/>
				<button onClick={this.saveOption}>Save</button>
			</li>
		);
	}

});

module.exports = QuestionOption;
