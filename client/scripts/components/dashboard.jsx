'use strict';

// dependencies
var React = require('react/addons');
var ElectionActions = require('../actions/ElectionActions');
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

  createElection: function () {
    ElectionActions.createElection()
  },

  createGroup: function(){
    this.context.router.transitionTo('/dashboard/group/create');
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
        <button onClick={this.createGroup}>Create a new Group</button>
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
