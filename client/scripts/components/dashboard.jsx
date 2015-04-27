'use strict';

// dependencies
var React = require('react/addons');
var ElectionActions = require('../actions/ElectionActions');
var _ = require('underscore');

// store and actions
var ElectionStore = require('../stores/ElectionStore');
var ElectionActions = require('../actions/ElectionActions');
var UserStore = require('../stores/UserStore');
var GroupStore = require('../stores/GroupStore');
var GroupActions = require('../actions/GroupActions');
// components
var ListElection = require('./modules/admin/ListElection.jsx');
var Spinner = require('./widgets/Spinner.jsx');
var Link = require('react-router').Link;

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
    GroupActions.getGroupList(true);

    return {
      elections: null,
      voteText: '',
      resultsText: ''
    };
  },

  componentDidMount: function() {
    ElectionStore.addChangeListener(this._onChange);
    GroupStore.addChangeListener(this._onChange);

  },

  componentWillUnmount: function() {
    ElectionStore.removeChangeListener(this._onChange);
    GroupStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var elections, groups;
    var userElections = this.state.elections;
    console.log(this.state.elections);
    if ( _.size(userElections) ) {
      elections = [];
      _.each(userElections, function(election){
        elections.push(<ListElection name={election.name} description={election.description} start={election.start} key={election.id} id={election.id} data={election}/>);
      });
    } else {
      elections = Spinner;
    }
    groups = this.state.groups ? this.state.groups.map(function(group){
      return (<li><Link to='groupAdmin' params={{id: group.id}}>{group.name}</Link></li>);
    }) : undefined;
    // groups = [<li>Group Stub 1</li>,<li>Group Stub 2</li>,<li>Group Stub 3</li>,<li>Group Stub 4</li>,<li>Group Stub 5</li>,<li>Group Stub 6</li>];
    return(
      <div className="dashboard" >
        <div className="container">

          <h1 className="page-title">Dashboard</h1>

          <div className="elections">
            <h2>Elections</h2>
            <button onClick={this.createElection}>Create a new Election</button>
            <ul>{elections}</ul>
          </div>

          <div className="groups">
            <h2>Groups</h2>
            <button onClick={this.createGroup}>Create a new Group</button>
            <ul>{groups}</ul>
          </div>
        </div>
      </div>
    );
  },

  _onChange: function () {
    var elections = ElectionStore.currentUserElections();
    var groups = GroupStore.getOwned(true);
    this.setState({
      elections: elections,
      groups: groups
    });
  }

});

module.exports = IndexComponent;

        // <h5><a href='/docs/api/index.html'>API Reference</a></h5>
        // <h5><a href='/docs/styleguide/index.html'>Style Guide</a></h5>