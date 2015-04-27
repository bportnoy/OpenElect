'use strict';

var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var axios = require('axios');
var Question = require('./Question.jsx');

var PollForm = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
      router: React.PropTypes.func
  },

  getInitialState: function () {
    var params = this.context.router.getCurrentParams();
    return {questionCount: 1,
            electionId: params.electionId};
  },

  addAnotherQuestion: function(e) {
    e.preventDefault();
    this.setState({questionCount: this.state.questionCount+1});
  },

  savePoll: function(e) {
    //TODO: spinner here
    e.preventDefault();
    axios.post('/api/v1/polls/create', {
      name: this.state.pollName,
      description: this.state.pollDescription,
      election_id: this.state.electionId
    }).then(function(response){
      //todo: kill the spinner
      this.setState({pollId: response.data.id});
      console.log('poll saved with id: ' + this.state.pollId);
    }.bind(this)).catch(function(response){
      console.error(response);
    });
  },

  render: function() {
    var questions = [];
    for (var i = 1; i <= this.state.questionCount; i++) {
      questions.push(<Question number={i} pollId={this.state.pollId}/>);
    }

    return (
      <form className='poll-form'>
        <h1>Create Poll</h1>
        <h3>Add a poll to election {this.state.electionId}</h3>

        <h3>Poll Name</h3>
        <input type='text' placeholder='Enter a name for the poll' valueLink={this.linkState('pollName')} />

        <h3>Description</h3>
        <textarea rows='4' cols='70' className='description-field'
                   placeholder='Enter a detailed description of the election, 1000 characters max'
                   valueLink={this.linkState('pollDescription')}></textarea>
        <button onClick={this.savePoll}>Save Poll Details</button>
        <hr />

        <div>{ questions }</div>

        <button type='button' className='btn' onClick={ this.addAnotherQuestion }>ADD A QUESTION</button>
        <br />
      </form>
    );
  }
});


//removed this from the bottom:

        // <a href='#' className='cancel'>CANCEL</a>
        // <input type='submit' action='Post' value='SAVE' onClick={ this.submitPoll } />
module.exports = PollForm;
