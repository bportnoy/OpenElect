'use strict';

var React = require('react');
var axios = require('axios');

var ElectionAdmin = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return this.context.router.getCurrentParams();
  },

  // viewElectionPolls: function() {
  //     this.context.router.transitionTo('polls');
  // },

  addPoll: function(){
    this.context.router.transitionTo('pollCreate', {electionId: this.state.id});
  },

  render: function() {
      return (
          <div className="election-item">
              <div className="electionOverview">
                  <h1 className="electionName">Election Name: { this.state.name }</h1>
                  <p className="electionDescription"><h4>Description:</h4> { this.state.description }</p>
              </div>
              <div className="electionDetails">
                  <div className="electionPrivacyStrategy"><h4>Privacy:</h4> { this.state.privacy_strategy }</div>
                  <div className="electionIsTimed"><h4>Timed:</h4> { this.state.timed }</div>
                  <div className="electionStart"><h4>Start:</h4> { this.state.start }</div>
                  <div className="electionEnd"><h4>End:</h4> { this.state.end }</div>
                  <div className="electionTwoFactorAuth"><h4>Two-Factor Authentication:</h4> { this.state.two_factor_auth }</div>
                  <div className="electionForceTwoFactorAuth"><h4>Forced Two-Factor Authentication:</h4> { this.state.force_two_factor_auth }</div>
                  <div className="electionRandomize"><h4>Randomize Answer Order:</h4> { this.state.randomize_answer_order }</div>
                  <div className="electionIsLocked"><h4>Locked:</h4> { this.state.locked }</div>
                  <div className="electionIsAcceptingVotes"><h4>Accepting Votes:</h4> { this.state.accepting_votes }</div>
              </div>

              <button type="button"
                       className="btn add-poll"
                       ref="add-poll"
                       onClick={this.addPoll}>ADD POLL</button>
          </div>
      );
  }
});

module.exports = ElectionAdmin;


