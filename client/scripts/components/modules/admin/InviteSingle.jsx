'use strict';

var React = require('react/addons');
var uuid = require('uuid');
var _ = require('lodash');

var GroupActions = require('../../../actions/GroupActions');
var GroupStore = require('../../../stores/GroupStore');

var InviteSingle = React.createClass({

  updateUserField: function(field, e){
    var value = e.target.value;
    switch (field){
      case 'first':
        this.setState({first: value}, this.saveAccurateStateToStore);
      break;

      case 'last':
        this.setState({last: value}, this.saveAccurateStateToStore);
      break;

      case 'email':
        this.setState({email: value}, this.saveAccurateStateToStore);
      break;
    }    
  },

  saveAccurateStateToStore: function(){
    this.saveToStore({
      id: this.state.id,
      FirstName: this.state.first,
      LastName: this.state.last,
      EmailAddress: this.state.email
    });
  },

  saveToStore: _.debounce(GroupActions.updatePendingInvite, 500),

  getInitialState: function() {
    return {
      id: uuid.v1(),
      first: '',
      last: '',
      email: ''
    };
  },

  render: function() {
      return (
        <div>
          <p>First Name: <input type='text' value={this.state.first} onChange={this.updateUserField.bind(this,'first')}/></p>
          <p>Last Name: <input type='text' value={this.state.last} onChange={this.updateUserField.bind(this,'last')}/></p>
          <p>E-mail Address: <input type='text'value={this.state.email} onChange={this.updateUserField.bind(this,'email')}/></p>
          <hr/>
        </div>);
  }
});

module.exports = InviteSingle;