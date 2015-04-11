'use strict';

var React = require('react');

var ElectionAdmin = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        return null;
    },

    viewElectionPolls: function() {
        this.context.router.transitionTo('polls');
    },

    render: function() {
        return (
            <div className="election-item">
                <div className="electionOverview">
                    <h1 className="electionName">Election Name: { this.props.name }</h1>
                    <p className="electionDescription"><h4>Description:</h4> { this.props.description }</p>
                </div>
                <div className="electionDetails">
                    <div className="electionPrivacyStrategy"><h4>Privacy:</h4> { this.props.privacy_strategy }</div>
                    <div className="electionIsTimed"><h4>Timed:</h4> { this.props.timed }</div>
                    <div className="electionStart"><h4>Start:</h4> { this.props.start }</div>
                    <div className="electionEnd"><h4>End:</h4> { this.props.end }</div>
                    <div className="electionTwoFactorAuth"><h4>Two-Factor Authentication:</h4> { this.props.two_factor_auth }</div>
                    <div className="electionForceTwoFactorAuth"><h4>Forced Two-Factor Authentication:</h4> { this.props.force_two_factor_auth }</div>
                    <div className="electionRandomize"><h4>Randomize Answer Order:</h4> { this.props.randomize_answer_order }</div>
                    <div className="electionIsLocked"><h4>Locked:</h4> { this.props.locked }</div>
                    <div className="electionIsAcceptingVotes"><h4>Accepting Votes:</h4> { this.props.accepting_votes }</div>
                </div>

                <button type="button" className="btn view-polls" ref="view-polls" onClick={this.viewElectionPolls}>VIEW ELECTION POLLS</button>
            </div>
        );
    }
});

module.exports = ElectionAdmin;


