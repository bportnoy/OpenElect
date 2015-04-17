'use strict';

var React = require('react');
var _ = require('underscore');
var Selection = require('./Selection.jsx');

var Question = React.createClass({
  render: function(){
    return (
      <div className='question-vote-count'>
        <h3>{ this.props.question }</h3>
        <Selection select={ this.props.selection }></Selection>
      </div>
    )
  }
});

module.exports = Question;
