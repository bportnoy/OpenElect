'use strict';

var React = require('react');
var Election = require('./Election.jsx');
var BallotStore = require('../../../stores/BallotStore');
var UserStore = require('../../../stores/UserStore');
var BallotActions = require('../../../actions/BallotActions');
var axios = require('axios');
var Spinner = require('../../widgets/Spinner.jsx');


var VotingBooth = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    this.getElection();
    return {polls: null};
  },

  getElection: function(){
    //ajax call to get the election object
    //var polls = election.polls;
    var electionId = this.context.router.getCurrentParams().electionId;
    var userId = UserStore.getUserId();
    BallotActions.setUserAndElection(userId, electionId);

    axios.get('api/v1/elections/update/' + electionId)
      .then(function(response){
        // if currently accepting vote, then show polls
        if(response.data.accepting_votes){
          axios.get('/api/v1/elections/vote/' + electionId)
            .then(function(response){
              this.setState({polls: response.data.poll});
              BallotActions.saveElectionData(response.data);
            }.bind(this));
            // .catch(function(election){
            //   console.error(election);
            // });
        } else {
          // Get election start and end day to show?
          this.setState({polls: "not_ready"});
        }
      }.bind(this))
      .catch(function(response){
        console.error(response);
      });

  },

  render: function() {
    // Check the state to decide show the right messages
    if (this.state.polls === null) {
      // Beginner state
      var display = (<Spinner/>);
    } else if (this.state.polls ==="not_ready"){
      var display = ( <div><h3>This election is not currently accepting votes.</h3></div> );
    } else {
      var display = ( <div><Election polls={this.state.polls}/></div> )
    }

    return (
      <div className="container">{display}</div>
    );
  },

  _onChange: function () {
    this.setState();
  }

});

module.exports = VotingBooth;
