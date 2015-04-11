'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var axios = require('axios');
var Question = require('../modules/Question.jsx');

var PollForm = React.createClass({

    getInitialState: function () {
      return {questionCount: 1};
    },

    addAnotherQuestion: function() {
      this.setState({questionCount: this.state.questionCount+1});
    },

    submitPoll: function() {
      this.context.router.transitionTo('poll');
    },

    render: function() {
      var questions = [];
      for (var i = 1; i <= this.state.questionCount; i++) {
        questions.push(<Question number={i} />);
      }

      return (
        <form className='poll-form'>
          <h1>Create Poll</h1>

          <h3>Poll Name</h3>
          <input type='text' placeholder='Enter a name for the poll' ref='name' />

          <h3>Description</h3>
          <textarea rows='4' cols='70' className='description-field' placeholder='Enter a detailed description of the election, 1000 characters max' ref='description'></textarea>
          <hr />

          <div>{ questions }</div>

          <button type='button' className='btn' onClick={ this.addAnotherQuestion }>ADD A QUESTION</button>
          <br />

          <a href='#' className='cancel'>CANCEL</a>
          <input type='submit' action='Post' value='SAVE' onClick={ this.submitPoll } />
        </form>
      );
    }
});

module.exports = PollForm;
