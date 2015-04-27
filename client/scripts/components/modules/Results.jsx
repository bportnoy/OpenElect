'use strict';

var React = require('react');
var axios = require('axios');
var _ = require('underscore');
var QuestionList = require('./result/QuestionList.jsx');

var Results = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function(){
    this.getQuestions();
    return { election: {results: null} };
  },

  getQuestions: function(){
    var election_id = this.context.router.getCurrentParams().electionId;
    // axios.post('/api/v1/elections/update/' + election_id )
    axios.post('/api/v1/elections/results/' + election_id )
      .then(function(response){
        // console.log("election.data.result", response.data.results);
        // console.log("key for results", Object.keys(response.data.results));
        console.log(response);
        this.setState({ election: response.data });
      }.bind(this));
      // The catch seems to catch other files error. Temperatory disable it
      // .catch(function(response){
      //   console.error(response);
      // });
  },

  render: function(){
    // Beginning state
    var display = (
          <div>
            <h3>The election result is not available yet. </h3>
          </div>
        );

    // axios return, election is ture
    if(this.state.election.results !== null){
      display = (
        <div>
          <h1>Election Results: {this.state.election.name} </h1>
          <QuestionList data = {this.state.election}></QuestionList>
        </div>
      );
    }

    return (
      <div>{display}</div>
    );
  },

  _onChange: function () {
    this.setState();
  }
});

module.exports = Results;
