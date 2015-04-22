'use strict';

var React = require('react');
var ElectionStore = require('../../../stores/ElectionStore');
var ElectionActions = require('../../../actions/ElectionActions');
var moment = require('moment');

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
    election.start = ElectionStore.getElectionStart();
    election.end = ElectionStore.getElectionEnd();
    this.setState(election);
  },

  render: function() {
    var selectOptions ={ // stubs, need to be removed
      "California/PST": "pst",
      "Mountain Standard": "mst",
      "Eastern Standard": "est"
    };
    var monthOptions ={ // stubs, need to be removed
      "January": 0,
      "February": 1,
      "March": 2,
      "April": 3,
      "May": 4,
      "June": 5,
      "July": 6,
      "August": 7,
      "September": 8,
      "October": 9,
      "November": 10,
      "December": 11
    };
    var dayOptions ={ // stubs, need to be removed
      "California/PST": "pst",
      "Mountain Standard": "mst",
      "Eastern Standard": "est"
    };
    var yearOptions ={ // stubs, need to be removed
      "California/PST": "pst",
      "Mountain Standard": "mst",
      "Eastern Standard": "est"
    };
    var timeOptions ={ // stubs, need to be removed
      "California/PST": "pst",
      "Mountain Standard": "mst",
      "Eastern Standard": "est"
    };
    
    // if the election is timed, we'll display the date selectors
    var dateClasses = 'date-selectors';
    if ( this.state.timed ) {
      dateClasses = dateClasses + ' active';
    }
    return (
      <section className="edit-election">
        <h1 className="title">Editing {this.state.name}</h1>
        <div className="edit-election-inner">
          <div className="election-title">
            <h2><span className="input-name">Name:</span> { this.state.name }</h2>
            <ElectionInput name="title" type="text" property="name" value={this.state.name}></ElectionInput>
          </div>
          <div className="election-description">
            <p><span className="input-name">Description:</span> { this.state.description }</p>
            <ElectionInput name="description" type="textarea" property="description" value={this.state.description}></ElectionInput>
          </div>
          <div className="election-dates">
            <ElectionInput name="Election has start and end dates?" type="checkbox" value={this.state.timed} property="timed" /> 
            <div className={dateClasses}>
              <div className="time-zone">
                <ElectionInput name="Time Zone" type="select" options={selectOptions} defaultOption="Select One" value={this.state.user_time_zone} property="user_time_zone" />
              </div>
              <div className="start">
                <ElectionInput name="Start Month" type="select" options={monthOptions} defaultOption="Select Month" value={this.state.start.month()} property="start_month" />
                <ElectionInput name="Start Day" type="select" options={dayOptions} defaultOption="Select Day" value={this.state.start.day()} property="start_day" />
                <ElectionInput name="Start Year" type="select" options={yearOptions} defaultOption="Select Year" value={this.state.start.year()} property="start_year" />
                <ElectionInput name="Start Time" type="select" options={timeOptions} defaultOption="Select Time" value={this.state.start.hour()} property="start_hour" />
              </div>
              <div className="end">
                <ElectionInput name="End Month" type="select" options={monthOptions} defaultOption="Select Month" value={this.state.end.month()} property="end_month" />
                <ElectionInput name="End Day" type="select" options={dayOptions} defaultOption="Select Day" value={this.state.end.day()} property="end_day" />
                <ElectionInput name="End Year" type="select" options={yearOptions} defaultOption="Select Year" value={this.state.end.year()} property="end_year" />
                <ElectionInput name="End Time" type="select" options={timeOptions} defaultOption="Select Time" value={this.state.end.hour()} property="end_hour" />
              </div>
            </div>
          </div>
          <div className="election-privacy">
            <ElectionInput name="title" type="checkbox" property="two_factor_auth" value={this.state.two_factor_auth}></ElectionInput>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = ElectionAdmin;


