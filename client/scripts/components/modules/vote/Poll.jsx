'use strict';

var Question = require('./Question.jsx');
var React = require('react');


var Poll = React.createClass({
  render: function() {
    var allQuestions = this.props.questions;
    var questions = [];

    allQuestions.forEach(function(question){
      questions.push(<Question
                        title={question.title}
                        instructions={question.instructions}
                        options={question.options}
                        id={question.id} />);
    });

    return (
      <section className='poll'>
      <h1 className='poll-title'>{this.props.name}</h1>
      <div className='question-list'>{questions}</div>
      </section>
    );
  }

});

module.exports = Poll;