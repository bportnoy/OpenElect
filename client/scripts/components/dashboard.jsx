'use strict';

// dependencies
var React = require('react/addons');
var ElectionActions = require('../actions/ElectionActions');
var Link = require('react-router').Link;
var _ = require('underscore');

// store and actions
var ElectionStore = require('../stores/ElectionStore');
var ElectionActions = require('../actions/ElectionActions');
var UserStore = require('../stores/UserStore');
// components
var ListElection = require('./modules/admin/ListElection.jsx');
var Spinner = require('./widgets/Spinner.jsx');

// STUB DATA
var userId = 1;

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

  createElection: function () {
    ElectionActions.createElection()
  },

  getInitialState: function () {
    ElectionActions.getUserElections();
    return {
      elections: null,
      voteText: '',
      resultsText: ''
    };
  },

  componentDidMount: function() {
    ElectionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ElectionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var elections;
    var userElections = this.state.elections;
    if ( _.size(userElections) ) {
      elections = [];
      _.each(userElections, function(election){
        elections.push(<ListElection name={election.name} description={election.description} start={election.start} key={election.id} id={election.id}/>);
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
          <button onClick={this.createElection}>Create a new Election</button>
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
  },

  _onChange: function () {
    var elections = ElectionStore.currentUserElections();
    this.setState({
      elections: elections
    });
  }

});

module.exports = IndexComponent;
