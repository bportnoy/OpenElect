'use strict';

var React = require('react/addons');

var GroupActions = require('../../../actions/GroupActions');
var GroupStore = require('../../../stores/GroupStore');

var AddGroupName = require('./AddGroupName.jsx');
var InviteByCSV = require('./InviteByCSV.jsx');
var InviteByEmail = require('./InviteByEmail.jsx');
var SetParentChild = require('./SetParentChild.jsx');


var CreateGroup = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    groupName: React.PropTypes.string,
    spinner: React.PropTypes.bool,
    doneWithButtons: React.PropTypes.bool
  },

  componentDidMount: function() {
    GroupActions.getGroupList(true);
    GroupStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    GroupStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(GroupStore.getCreateStatus());
  },

  _inviteByCSV: function() {
    GroupActions.toggleInviteBlockStatus();
    GroupActions.toggleInviteButtonStatus();
    this.setState({inviteBlock: <InviteByCSV/>});
  },

  _inviteByEmail: function() {
    GroupActions.toggleInviteBlockStatus();
    GroupActions.toggleInviteButtonStatus();
    this.setState({inviteBlock: <InviteByEmail/>});
  },

  getInitialState: function() {
    GroupActions.beginCreate();
    return {showButtons: false,
            nameSelected: false,
            showInviteBlock: false,
            showPCBlock: false,
            groupName: '',
            spinner: false,
            inviteBlock: undefined};
  },

  render: function() {
    var groupName = this.state.nameSelected ? (<h2>{this.state.group.name}</h2>) : (<AddGroupName />);

    var inviteChoices = !this.state.showButtons ? undefined : (
      <div>
        <button onClick={this._inviteByCSV}>Invite by CSV Upload</button>
        <button onClick={this._inviteByEmail}>Invite Individual Users By E-mail</button>
      </div>);

    var inviteBlock = this.state.showInviteBlock ? this.state.inviteBlock : undefined;

    var parentChildBlock = this.state.showPCBlock ? (<SetParentChild group={this.state.group}/>) : undefined;

    var spinner = this.state.spinner ? (<i className="fa fa-circle-o-notch fa-spin fa-2x"></i>) : undefined;

      return (
          <div className="container">
            <h1>Create New Group</h1>
            <div>{groupName}</div>
            <div>{inviteChoices}</div>
            <div>{inviteBlock}</div>
            <div>{parentChildBlock}</div>
          </div>
      );
    }

});

module.exports = CreateGroup;
