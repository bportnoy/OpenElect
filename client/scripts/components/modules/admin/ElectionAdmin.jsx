'use strict';

var React = require('react');
var ElectionStore = require('../../../stores/ElectionStore');
var ElectionActions = require('../../../actions/ElectionActions');

var ElectionInput = require('./ElectionInput.jsx');

var ElectionAdmin = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    var state = ElectionStore.getCurrentElectionData();
    if ( !state.id ) {
      var id = this.context.router.getCurrentParams();
      ElectionActions.setCurrentElection(id.id);
    }
    return state;
  },

  addPoll: function(){
    this.context.router.transitionTo('pollCreate', {electionId: this.state.id});
  },

  componentDidMount: function() {
    ElectionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ElectionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var election = ElectionStore.getCurrentElectionData();
    this.setState(election);
  },

  render: function() {
      return (
        <section className="edit-election">
          <h1 className="title">Edit this Election</h1>
          <div className="election-title">
            <h2><span className="description">Name:</span> { this.state.name }</h2>
            <ElectionInput name="title" type="text" key={this.state.id} property="name" value={this.state.name}></ElectionInput>
          </div>
        </section>
      );
  }
});

module.exports = ElectionAdmin;


