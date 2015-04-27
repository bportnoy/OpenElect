'use strict';

var React = require('react');
var _ = require('underscore');
var Question = require('./Question.jsx');

var QuestionList = React.createClass({

  render: function(){
    console.log('qlrender');
    console.log(this.props);
    var questionNodes = _.map(this.props.data.results, function(question){
      console.log(question);
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

    console.log(questionNodes);
    return (
      <div className="questionList">
        {questionNodes}
      </div>
    )
  }
});

module.exports = QuestionList;
