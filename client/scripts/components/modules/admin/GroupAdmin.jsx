'use strict';

var React = require('react/addons');
var Moment = require('moment');

var GroupActions = require('../../../actions/GroupActions');
var GroupStore = require('../../../stores/GroupStore');
var UserList = require('./UserList.jsx');

var axios = require('axios');

var GroupAdmin = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    willTransitionTo: function(transition, params, query, callback){
      GroupActions.setActiveGroup(params.id);
      GroupActions.getUserList(params.id);
      GroupActions.getGroupList(true, callback);
    }
  },

  componentDidMount: function() {
    GroupStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    GroupStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    var group = GroupStore.getGroup(this.state.id);
    var users = GroupStore.getUserListForCurrent();
    console.log(users);
    var parent = GroupStore.getGroup(group.parent_id);
    var children;

    if (group.children !== null){
      children = group.children.map(function(childId){
        return GroupStore.getGroup(childId);
      });
    }

    this.setState({
      group: group,
      users: users,
      parent: parent,
      children: children,
      editing: false,
      spinner: false
    });
  },

  editMode: function(){
    this.setState({
      newName: this.state.group.name,
      newParent: this.state.group.parent,
      newChildren: this.state.group.children,
      editing: true
    });
  },

  getInitialState: function() {
    var id = this.context.router.getCurrentParams().id;
    var group = GroupStore.getGroup(id);
    var users = GroupStore.getUserListForCurrent();
    var parent = GroupStore.getGroup(group.parent_id);
    var children;

    if (group.children !== null){
      children = group.children.map(function(childId){
        return GroupStore.getGroup(childId);
      });
    }

    return {
      group: group,
      id: id,
      users: users,
      parent: parent,
      children: children,
      editing: false,
      spinner: false
    };
  },

  render: function() {
    var parent = this.state.parent ? <h3>Parent: {this.state.parent.name}</h3> : <h3>No Parent Group</h3>;
    var children = this.state.children ? <div><h3>Children:</h3><ul>{childList}</ul></div> : <h3>No Child Groups</h3>;
    if (this.state.editing){
      return (
        <div>
          <input type='text'
                  name='groupName'
                  placeholder='California 11th Congressional District'
                  valueLink={this.linkState('newName')} />
        </div>
        );
    } else {
      return (
        <div className="container">
          <h1 id='grouphead'>{this.state.group.name}</h1><i className="fa fa-pencil" onClick={this.editMode}></i>
          <h3>Created: {Moment(this.state.group.created_at).fromNow()}</h3>
          <h3>Last Updated: {Moment(this.state.group.updated_at).fromNow()}</h3>
          <div>{parent}</div>
          <div>{children}</div>
          <h3>{this.state.users.length} Members</h3>
          <UserList users={this.state.users} group={this.state.id} key={this.state.users.length}/>
        </div>
        );
    }
  }

});

module.exports = GroupAdmin;
