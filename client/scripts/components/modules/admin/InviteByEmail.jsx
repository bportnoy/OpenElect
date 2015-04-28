'use strict';

var React = require('react/addons');
var uuid = require('uuid');

var GroupActions = require('../../../actions/GroupActions');
var GroupStore = require('../../../stores/GroupStore');

var InviteSingle = require('./InviteSingle.jsx');

var InviteByEmail = React.createClass({

  getInitialState: function() {
    return {fields: 1, spinner: false};
  },

  addField: function(){
    this.setState({fields: this.state.fields+1});
  },

  componentDidMount: function() {
    GroupStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    GroupStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({spinner: false});
  },

  sendInvites: function(){
    this.setState({spinner: true});
    GroupActions.sendPendingInvites();
  },

  render: function() {
    var spinner = this.state.spinner ? (<i className="fa fa-circle-o-notch fa-spin fa-2x"></i>) : undefined;

    var fields = [];
    for (var i = 0; i < this.state.fields; i++){
      fields.push(<InviteSingle key={i}/>);
    }

      return (
        <div>
          <div>{fields}</div>
          <button onClick={this.addField}>Add Another</button>
          <button onClick={this.sendInvites}>Save</button><div>{spinner}</div>
        </div>
        );
  }
});

module.exports = InviteByEmail;
