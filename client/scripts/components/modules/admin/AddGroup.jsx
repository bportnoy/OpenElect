'use strict';

var React = require('react/addons');
var GroupActions = require('../../../actions/GroupActions');
var GroupStore = require('../../../stores/GroupStore');


var AddGroup = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  saveName: function(e){
    e.preventDefault();
    this.setState({spinner: true});
    GroupActions.createGroup(this.state.groupName);
  },

  componentDidMount: function() {
    GroupStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    GroupStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({spinner: false, groupName: ''});
    this.setState(GroupStore.getNewest());
  },

  getInitialState: function() {
    return {groupName: '', spinner: false};
  },

  render: function() {
    var spinner = this.state.spinner > 0 ? (<i className="fa fa-circle-o-notch fa-spin fa-2x"></i>) : undefined;
      return (
          <div>
            <h1>Create New Group</h1>
            <form className='group-form' onSubmit={this.handleSubmit}>
              <h3>Group Name</h3>
              <input type='text'
                      name='groupName'
                      placeholder='California 11th Congressional District'
                      valueLink={this.linkState('groupName')} />
              <button type='submit' onClick={this.saveName}>Create Group</button><div>{spinner}</div>
            </form>
          </div>
      );
  }
});

module.exports = AddGroup;