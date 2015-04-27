'use strict';

var React = require('react');
var _ = require('underscore');

var QuestionActions = require('../../../../actions/QuestionActions');


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
    if ( event.target.type === 'text' || event.target.type === 'number' ) {
      QuestionActions.setProperty(this.props.question.id, event.target.name, event.target.value);
    } else {
      var data = {
      	question: {
        	id: this.state.poll.id,
      	}
      }
      data.question[event.target.name] = event.target.value;
      QuestionActions.update(data);
    }
  },

  saveProperty: function(property){
    QuestionActions.saveProperty(this.props.question.id, property);
  },

	render: function() {
		var question = this.props.question;
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
			</li>
		);
	}
});

module.exports = QuestionListItem;