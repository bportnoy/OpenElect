'use strict';

var React = require('react');
var ElectionStore = require('../../../../stores/ElectionStore');
var ElectionActions = require('../../../../actions/ElectionActions');
var PollActions = require('../../../../actions/PollActions');
var PollStore = require('../../../../stores/PollStore');
var moment = require('moment');
var _ = require('underscore');

var StatefulInput = require('../../../widgets/StatefulInput.jsx');

var PollAdmin = React.createClass({

	contextTypes: {
      router: React.PropTypes.func
  },

  getInitialState: function () {
    var params = this.context.router.getCurrentParams();
    var poll = PollStore.getCurrent();
    if ( !poll.id || params.id !== poll.id ) {
    	console.log('don\'t have a poll');
    	if ( params.id ) {
    		PollActions.get(params.id);
    	}
    } else {
    	console.log('got a poll', poll);
    }
    return {
    	questionCount: 1,
      electionId: params.electionId,
      poll: poll
    };
  },

  componentDidMount: function() {
    PollStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PollStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
  	var poll = PollStore.getCurrent();
  	this.setState({
  		poll: poll
  	});
  },

  nameInput: {
    store: 'PollStore',
    actions: 'PollActions',
    property: 'name',
    classes: []
  },

	render: function() {
		return (
			<section className='poll-form'>
        <h2>{ this.state.poll.name }</h2>
        <StatefulInput props={ this.nameInput } />
      </section>
    );
	}

});

module.exports = PollAdmin;
