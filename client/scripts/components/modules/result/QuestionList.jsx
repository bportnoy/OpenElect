'use strict';

var React = require('react');
var _ = require('underscore');
var Question = require('./Question.jsx');

var QuestionList = React.createClass({

  render: function(){
    var questionNodes = _.map(this.props.data.results, function(question){
      question.options.forEach(function(option){
        var id = parseInt(option.id, 10);
        if (question.selection[id]){
          question.selection[option.name] = question.selection[id];
        } else question.selection[option.name] = 0;
        delete question.selection[id];
      });
      return (
        <div>
          <Question question={question.question} selection={question.selection}>
          </Question>
        </div>
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
