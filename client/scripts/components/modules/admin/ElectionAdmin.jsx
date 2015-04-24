'use strict';

var React = require('react');
var ElectionStore = require('../../../stores/ElectionStore');
var ElectionActions = require('../../../actions/ElectionActions');
var moment = require('moment');
var _ = require('underscore');

var dateTimes = require('../../../data/dateTimes.js');

var ElectionInput = require('./election/ElectionInput.jsx');

var ElectionAdmin = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    var state = ElectionStore.getCurrentElectionData();
    state.start = moment(state.start);
    state.end = moment(state.end);
    if ( !state.id ) {
      var id = this.context.router.getCurrentParams();
      ElectionActions.setCurrentElection(id.id);
      state.start = state.end = moment('2013-02-08 09:30:26.123+07:00'); // in case we don't have any start or end dates we still need to populate the <select>'s
    }
    return state;
  },

  addPoll: function(){
    this.context.router.transitionTo('pollCreate', {electionId: this.state.id});
  },

  componentWillMount: function() {
    this.selectOptions = this._buildOptions();
  },

  componentDidMount: function() {
    ElectionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ElectionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var election = ElectionStore.getCurrentElectionData();
    election.start = ElectionStore.getElectionStart();
    election.end = ElectionStore.getElectionEnd();
    this.setState(election);
  },

  _buildOptions: function() {
    var options = {};
    _.each(dateTimes, function(group, groupName) {
      options[groupName] = {};
      _.each(group, function(option){
        options[groupName][option.name] = option.value;
      });
    });
    console.log('builtOptions', options);
    return options;
  },

  _buildDayOptions: function(startOrEnd) {
    var options = {};
    _.each(dateTimes.months, function(month) {
      if ( month.name === this.state[startOrEnd].format('MMMM') ) {
        _(month.days).times(function(n){
          options[n+1] = n+1;
        });
      }
    }, this);
    return options;
  },

  render: function() {
    
    // if the election is timed, we'll display the date selectors
    var dateClasses = 'date-selectors';
    var dateInputDisabled = true;
    if ( this.state.timed ) {
      dateClasses = dateClasses + ' active';
      dateInputDisabled = false;
    }

    var startDays = this._buildDayOptions('start');
    var endDays = this._buildDayOptions('end');

    return (
      <section className="edit-election">
        <h1 className="title">Editing {this.state.name}</h1>
        <div className="edit-election-inner">
          <div className="group election-title">
            <ElectionInput name="title" type="text" property="name" value={this.state.name}></ElectionInput>
          </div>
          <div className="group election-description">
            <ElectionInput name="description" type="textarea" property="description" value={this.state.description}></ElectionInput>
          </div>
          <div className="group election-dates">
            <h3>Dates &amp; Times</h3>
            <ElectionInput name="Election has start and end dates?" type="checkbox" value={this.state.timed} property="timed" /> 
            <div className={dateClasses}>
              <div className="time-zone">
                <ElectionInput name="Time Zone" type="select" options={this.selectOptions.timezones} defaultOption="Select One" value={this.state.user_time_zone} disabled={dateInputDisabled} property="user_time_zone" />
              </div>
              <div className="start">
                <ElectionInput name="Start Month" type="select" options={this.selectOptions.months} defaultOption="Select Month" value={this.state.start.month()} disabled={dateInputDisabled} property="start_month" />
                <ElectionInput name="Start Day" type="select" options={startDays} defaultOption="Select Day" value={this.state.start.day()} disabled={dateInputDisabled} property="start_day" />
                <ElectionInput name="Start Year" type="select" options={this.selectOptions.years} defaultOption="Select Year" value={this.state.start.year()} disabled={dateInputDisabled} property="start_year" />
                <ElectionInput name="Start Time" type="select" options={this.selectOptions.hours} defaultOption="Select Time" value={this.state.start.hour()} disabled={dateInputDisabled} property="start_hour" />
              </div>
              <div className="end">
                <ElectionInput name="End Month" type="select" options={this.selectOptions.months} defaultOption="Select Month" value={this.state.end.month()} disabled={dateInputDisabled} property="end_month" />
                <ElectionInput name="End Day" type="select" options={endDays} defaultOption="Select Day" value={this.state.end.day()} disabled={dateInputDisabled} property="end_day" />
                <ElectionInput name="End Year" type="select" options={this.selectOptions.years} defaultOption="Select Year" value={this.state.end.year()} disabled={dateInputDisabled} property="end_year" />
                <ElectionInput name="End Time" type="select" options={this.selectOptions.hours} defaultOption="Select Time" value={this.state.end.hour()} disabled={dateInputDisabled} property="end_hour" />
              </div>
            </div>
          </div>
          <div className="group election-privacy">
            <ElectionInput name="title" type="checkbox" property="two_factor_auth" value={this.state.two_factor_auth}></ElectionInput>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = ElectionAdmin;


