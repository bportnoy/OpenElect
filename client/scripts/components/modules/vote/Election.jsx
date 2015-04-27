'use strict';

var Poll = require('./Poll.jsx');
var React = require('react');
var BallotActions = require('../../../actions/BallotActions');


var Election = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  submitBallot: function(e){
    e.preventDefault();
    if (!this.state.submitted){
      this.setState({submitted: true});
      BallotActions.submitBallot(this.context.router);
      this.context.router.transitionTo('submitting');
    }
  },

  getInitialState: function(){
    return {submitted: false};
  },

  render: function() {
    var allPolls = this.props.polls;
    var polls = [];

    allPolls && allPolls.forEach(function(poll){
      polls.push(<Poll name={poll.name} questions={poll.question} key={poll.id}/>);
    });

    return (
      <section id='election'>
        <div className='poll-list'>{polls}</div>
        <button className='submit-ballot' onClick={this.submitBallot}>Submit Ballot</button>
      </section>
    );
  }

});

module.exports = Election;
