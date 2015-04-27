'use strict';

var React = require('react');
var ElectionStore = require('../../../../stores/ElectionStore');
var ElectionActions = require('../../../../actions/ElectionActions');
var PollActions = require('../../../../actions/PollActions');
var GroupActions = require('../../../../actions/GroupActions');
var PollStore = require('../../../../stores/PollStore');
var GroupStore = require('../../../../stores/GroupStore');
var QuestionList = require('../question/QuestionList.jsx');
var moment = require('moment');
var _ = require('underscore');


var PollAdmin = React.createClass({

	contextTypes: {
      router: React.PropTypes.func
  },

  getInitialState: function () {
    var params = this.context.router.getCurrentParams();
    var poll = PollStore.getCurrent();
    var groups = GroupStore.getOwned();
    if ( !poll.id || params.id !== poll.id ) {
    	if ( params.id ) {
    		PollActions.get(params.id);
    	}
    }
    return {
    	questionCount: 1,
      electionId: params.electionId,
      poll: poll,
      groups: groups
    };
  },

  componentWillMount: function() {
    GroupActions.getGroupList(true);
  },

  componentDidMount: function() {
    PollStore.addChangeListener(this._onChange);
    GroupStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PollStore.removeChangeListener(this._onChange);
    GroupStore.removeChangeListener(this._onChange);
  },

  setProperty: function(event) {
    event.preventDefault();
    var value;
    // we'll look for a different value if the input is a checkbox or radio
    if ( event.target.type === 'checkbox' || event.target.type === 'radio' ) {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }
    // we'll defer saving the property until the user clicks 'save' for text and number inputs
    if ( event.target.type === 'text' || event.target.type === 'number' ) {
      console.log('we have text');
      PollActions.setProperty(event.target.name, event.target.value);
    } else {
      console.log('we\'ll save this now');
      var data = {
        id: this.state.poll.id,
      }
      data[event.target.name] = event.target.value;
      PollActions.update(data);
    }
  },

  saveProperty: function(property){
    PollActions.saveProperty(property);
  },

  _onChange: function() {
  	var poll = PollStore.getCurrent();
    this.buildGroupOptions();
  	this.setState({
  		poll: poll
  	});
  },

  buildGroupOptions: function() {
    var groupOptions = [
      <option value="null" key="no-group" disabled="true">Select One</option>
    ];
    _.each(this.state.groups, function(group) {
      groupOptions.push(
        <option value={group.id} key={group.id}>{group.name}</option>
      );
    });
    this.setState({
      groupOptions: groupOptions
    });
  },

	render: function() {
		return (
			<section className='poll-form'>
        <h1>Editing { this.state.poll.name }</h1>
        <div className="form-inner">
          <div className="group poll-title">
            <label htmlFor="name">Title</label>
            <input name="name" type="text" onChange={this.setProperty} value={this.state.poll.name} />
            <button onClick={this.saveProperty.bind(this, 'name')}>Save</button>
          </div>
          <div className="group poll-group">
            <label htmlFor="group_id">Voter Group</label>
            <select name="group_id" onChange={this.setProperty} value={this.state.poll.group_id}>
              {this.state.groupOptions}
            </select>
          </div>
          <div className="group poll-questions">
            <h3>Poll Questions</h3>
            <QuestionList pollId={this.state.poll.id} />
          </div>
        </div>
      </section>
    );
	}

});

module.exports = PollAdmin;

