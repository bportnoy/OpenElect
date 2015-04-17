'use strict';

var React = require('react');
var _ = require('underscore');
var Question = require('./Question.jsx');

var QuestionList = React.createClass({
  render: function(){
    var questionNodes = _.map(this.props.data.results, function(question){
      return (
        <Question question={question.question} selection={question.selection}>
        </Question>
      );
    });
    return (
      <div className="questionList">
        {questionNodes}
      </div>
    )
  }
});

module.exports = QuestionList;
