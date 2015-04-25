'use strict';

var React = require('react/addons');
var axios = require('axios');
var Formsy = require('formsy-react');
var Modal = require('react-modal');
var TextInputField = require('../widgets/TextInputField.jsx');
var PasswordInputField = require('../widgets/PasswordInputField.jsx');
var Router = require('react-router');
var Link = Router.Link;


var appElement = document.getElementById('app-view');

Modal.setAppElement(appElement);
Modal.injectCSS();


var ChangePassword = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    email: React.PropTypes.string,
    password: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      email: '',
      password: '',
      failedLogins: 0,
      canSubmit: false,
      modalIsOpen: true
    };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },

  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },

  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },

  handleSubmit: function (data) {
    axios.put('/api/v1/users/changePassword', data)
      .then(function(){
        this.closeModal;
        this.context.router.transitionTo('dashboard');
      }.bind(this))
      .catch(function(response){
        this.setState({
          warning: response.data
        });
      }.bind(this));
  },

  render: function () {
    var loginWarning = this.state.warning ? this.state.warning : undefined;
    return (
      <div>
        <Modal className='login-modal'
               isOpen={this.state.modalIsOpen}
               onRequestClose={this.closeModal}>
          <Formsy.Form className='login-form' onValidSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
            <i className="fa fa-times x-close-icon" onClick={this.closeModal}></i>
            <h1>Change Password</h1>
            <label htmlFor='old'>Old Password</label>
            <PasswordInputField name="old"
                        validations={{
                          matchRegexp: /^[a-zA-Z0-9]{1,}$/,
                        }}
                        validationErrors={{
                          matchRegexp: 'Not a valid password',
                        }} required/>
            <label htmlFor='new'>New Password</label>
            <PasswordInputField name="new"
                        validations={{
                          matchRegexp: /^[a-zA-Z0-9]{1,}$/,
                          minLength: 8,
                          maxLength: 50
                        }}
                        validationErrors={{
                          matchRegexp: 'Must contain only numbers, lowercase, uppercase letters',
                          minLength: 'Must be longer than 8 characters',
                          maxLength: 'Cannot be longer than 50 characters'
                        }} required/>
            <label htmlFor='new'>Repeat New Password</label>
            <PasswordInputField name="repeat"
                        validations={{equalsField:'new'}}
                        validationErrors={{
                          equalsField: 'Passwords do not match',
                        }} required/>
            <div className='error-message login-warning'><span>{loginWarning}</span></div>
            <button type="submit" disabled={!this.state.canSubmit}>Change Password</button>
          </Formsy.Form>
        </Modal>
      </div>
    );
  }
});

module.exports = ChangePassword;
