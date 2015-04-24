'use strict';

var React = require('react');
var Election = require('./Election.jsx');
var BallotStore = require('../../../stores/BallotStore');
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
    var userId = 1;
    BallotActions.setUserAndElection(userId, electionId);

    axios.get('/api/v1/elections/vote/' + electionId)
          .then(function(response){
            this.setState({polls: response.data});
          }.bind(this))
          .catch(function(response){
            console.error(response);
          });
  },

  render: function() {
    if (this.state.polls === null) return (<Spinner/>);

    return (
      <div>
        <Election polls={this.state.polls}/>
      </div>
    );
  },

  _onChange: function () {
    this.setState();
  }

});

module.exports = VotingBooth;
