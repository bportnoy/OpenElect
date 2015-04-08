'use strict';

var Option = require('./Option.jsx');
var React = require('react');
var BallotActions = require('../../../actions/BallotActions');


var Question = React.createClass({

  getInitialState: function(){
    BallotActions.addQuestion(this.props.id);
    return null;
  },

  render: function() {
    var allOptions = this.props.options;
    var options = [];

    allOptions.forEach(function(option){
      options.push(<Option name={option.name}
                              party={option.party}
                              statement={option.statement}
                              id={option.id}
                              questionId={this.props.id} />);
    }.bind(this));

    return (
      <div className='question-container'>
        <div className='question'>
          <h3>{this.props.title}</h3>
          <i className='fa fa-check-circle-o fa-2x pull-right vote-status'/>
        </div>
        <div className='options-container'>
          <h5>{this.props.instructions}</h5>
          <table className='options'>{options}</table>
        </div>
      </div>
    );
  }

});

module.exports = Question;