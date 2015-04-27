'use strict';

var React = require('react');
var _ = require('underscore');

var QuestionActions = require('../../../../actions/QuestionActions');
var QuestionOption = require('./QuestionOption.jsx');


var QuestionListItem = React.createClass({

	setProperty: function(event) {
    event.preventDefault();
    var value;
    // we'll look for a different value if the input is a checkbox or radio
    if ( event.target.type === 'checkbox' || event.target.type === 'radio' ) {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }
    // we'll defer saving the property until the user clicks 'save' for text and number inputs
    if ( event.target.type === 'text' || event.target.type === 'number' || event.target.tagName === 'TEXTAREA' ) {
      QuestionActions.setProperty(this.props.question.id, event.target.name, event.target.value);
    } else {
      var data = {
      	question: {
        	id: this.props.question.id,
      	}
      }
      data.question[event.target.name] = event.target.value;
      QuestionActions.update(data);
    }
  },

  saveProperty: function(property){
    QuestionActions.saveProperty(this.props.question.id, property);
  },

  deleteQuestion: function(id){
  	QuestionActions.delete(id);
  },

  addOption: function(){
  	QuestionActions.addOption(this.props.question.id);
  },

  buildOptions: function(){
  	var list = [];
  	console.log('build being called', this.props.question.options);
  	_.each(this.props.question.options, function(option){
  		console.log('this is an option:', option);
  		<QuestionOption key={this.props.question.id + '-' + option.id} option={option}/>
  	}, this);
  },

	render: function() {
		var question = this.props.question;
		var options = this.buildOptions();
		return (
			<li>
				<div className="question-name">
					<label htmlFor="name">Title</label>
					<input name="name" type="text" value={question.name} onChange={this.setProperty} />
					<button onClick={this.saveProperty.bind(this, 'name')}>Save</button>
				</div>
				<div className="question-description">
					<label htmlFor="description">Description</label>
					<textarea name="description" value={question.description} onChange={this.setProperty} />
					<button onClick={this.saveProperty.bind(this, 'description')}>Save</button>
				</div>
				<div className="question-options">
					<ul className="options">
						{options}
					</ul>
					<button onClick={this.addOption}>Add a Choice</button>
				</div>
			</li>
		);
	}
});

module.exports = QuestionListItem;