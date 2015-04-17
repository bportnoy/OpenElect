'use strict';

var React = require('react/addons');

var GroupActions = require('../../../actions/GroupActions');
var GroupStore = require('../../../stores/GroupStore');

var AddGroupName = require('./AddGroupName.jsx');
var InviteByCSV = require('./InviteByCSV.jsx');


var CreateGroup = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  // saveName: function(e){
  //   e.preventDefault();
  //   this.setState({spinner: true});
  //   GroupActions.createGroup(this.state.groupName);
  // },

  componentDidMount: function() {
    GroupStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    GroupStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({spinner: false,
                    group: GroupStore.getNewest(),
                    showButtons: GroupStore.getNewest(),
                    showInviteBlock: GroupStore.getInviteBlockStatus()});
  },

  _inviteByCSV: function() {
    GroupActions.toggleInviteBlockStatus();
    this.setState({inviteBlock: <InviteByCSV/>});
  },

  _inviteByEmail: function() {
    GroupActions.toggleInviteBlockStatus();
    this.setState({inviteBlock: undefined});
  },

  getInitialState: function() {
    GroupActions.beginCreate();
    return {showButtons: GroupStore.getNewest(),
            showInviteBlock: GroupStore.getInviteBlockStatus(),
            groupName: '',
            spinner: false,
            inviteBlock: undefined,
            doneWithButtons: false};
  },

  render: function() {
    var groupName = !this.state.showButtons ? (<AddGroupName />) : (<h2>{this.state.group.name}</h2>);
    var inviteChoices = !this.state.showButtons ? undefined : (
      <div>
        <button onClick={this._inviteByCSV}>Invite by CSV Upload</button>
        <button onClick={this._inviteByEmail}>Invite Individual Users By E-mail</button>
      </div>);
    var inviteBlock = this.state.showInviteBlock ? this.state.inviteBlock : undefined;
    var spinner = this.state.spinner > 0 ? (<i className="fa fa-circle-o-notch fa-spin fa-2x"></i>) : undefined;
      return (
          <div>
            <h1>Create New Group</h1>
            <div>{groupName}</div>
            <div>{inviteChoices}</div>
            <div>{inviteBlock}</div>
          </div>

      );
  }
});

module.exports = CreateGroup;