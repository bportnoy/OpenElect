'use strict';

var React = require('react/addons');
var DefaultLayout = require('./layouts/default.jsx');
var Link = require('react-router').Link;
var axios = require('axios');

// Custom components
var ListElection = require('./modules/admin/ListElection.jsx');
var Spinner = require('./widgets/Spinner.jsx');

// The Index Page
var IndexComponent = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  goVote: function () {
    var election = this.state.voteText;
    this.context.router.transitionTo('/vote/' + election);
  },

  whoWon: function () {
    var election = this.state.resultsText;
    this.context.router.transitionTo('/elections/' + election);
  },

  getElections: function() {
    axios.get('/api/v1/elections')
      .then(function(response){
        this.setState( { elections: response.data } );
      }.bind(this))
      .catch(function(error){

      });
  },

  getInitialState: function () {
    this.getElections();
    return {
      elections: null,
      voteText: '',
      resultsText: ''};
  },

  render: function() {
    var elections;
    if (this.state.elections) {
      elections = [];
      this.state.elections.forEach(function(election){
        elections.push(<ListElection name={election.name} description={election.description} start={election.start} key={election.id}/>);
      });
    } else {
      elections = Spinner;
    }
    return(
      <div>
        <h1>Welcome to OpenElect</h1>
        <div className="elections">
          <h2 className="active-elections">Your Elections</h2>
          <ul>{elections}</ul>
          <h3><Link to='electionCreate'>Create an Election</Link></h3>
        </div>

        <h2>Vote in an Election:</h2>
          <input type='text' placeholder='Enter election ID' valueLink={this.linkState('voteText')}/>
          <button onClick={this.goVote}>Vote!</button>
        <h2>View Results</h2>
          <input type='text' placeholder='Enter election ID' valueLink={this.linkState('resultsText')} />
          <button onClick={this.whoWon}>Who won?</button>
        <h5><a href='/docs/api/index.html'>API Reference</a></h5>
        <h5><a href='/docs/styleguide/index.html'>Style Guide</a></h5>
      </div>
    );
  }

});

module.exports = IndexComponent;
