'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var axios = require('axios');
var Answer = require('./Answer.jsx');

var Question = React.createClass({

  addAnotherOption: function() {
    this.setState({optionCount: this.state.optionCount+1});
  },

  getInitialState: function (){
    return {optionCount: 2};
  },

  render: function() {
    var options = [];
    for (var i = 1; i <= this.state.optionCount; i++){
      options.push(<Answer number={i} />);
    }
    return (
      <div>
        <h1>Question {this.props.number}</h1>
        <input type='text' placeholder='' ref='question-1' />
        <hr />
        <div>{ options }</div>
        <button onClick={this.addAnotherOption}>Add another answer option</button>
      </div>
    );
  }
});

module.exports = Question;
