'use strict';

var Poll = require('./Poll.jsx');
var React = require('react');
var BallotActions = require('../../actions/BallotActions');


var Election = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  submitBallot: function(){
    this.context.router.transitionTo('submitting');
    // BallotActions.submitBallot(this.props.id, this.props.userId);
  },

  render: function() {
    var allPolls = this.props.polls;
    var polls = [];

    allPolls.forEach(function(poll){
      polls.push(<Poll name={poll.pollName} questions={poll.questions} />);
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