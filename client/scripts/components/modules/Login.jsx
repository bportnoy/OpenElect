'use strict';

var React = require('react/addons');
var axios = require('axios');
var Formsy = require('formsy-react');
var Modal = require('react-modal');
var TextInputField = require('../widgets/TextInputField.jsx');
var PasswordInputField = require('../widgets/PasswordInputField.jsx');


var appElement = document.getElementById('app-view');

Modal.setAppElement(appElement);
Modal.injectCSS();


var LoginForm = React.createClass({

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
    axios.post('/api/v1/users/login',{
        user: data
      })
      .then(function(response){
        this.context.router.transitionTo(response.data);
        this.closeModal;
      }.bind(this))
      .catch(function(response){
        this.setState({
          failedLogins: this.state.failedLogins+1
        });
      }.bind(this));
  },

  render: function () {
    var loginWarning = this.state.failedLogins > 0 ? ('Username or password credentials incorrect') : undefined;
    return (
      <div>
        <Modal className='login-modal'
               isOpen={this.state.modalIsOpen}
               onRequestClose={this.closeModal}>
          <Formsy.Form className='login-form' onValidSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
            <h1>Sign into your account</h1>
            <label htmlFor='email'>Email</label>
            <TextInputField name="email"
                        validations={{
                          isEmail: true,
                        }}
                        validationErrors={{
                          isEmail: 'Enter a valid email',
                        }} required/>
            <label htmlFor='Password'>Password</label>
            <PasswordInputField name="password"
                        validations={{
                          matchRegexp: /^[a-zA-Z0-9]{1,}$/,
                        }}
                        validationErrors={{
                          matchRegexp: 'Not a valid password',
                        }} required/>
            <div className='error-message login-warning'><span>{loginWarning}</span></div>
            <button type="submit" disabled={!this.state.canSubmit}>Sign In</button>
            <div className='signin-link'><a href='#'>Register for a new account</a></div>
          </Formsy.Form>
        </Modal>
      </div>
    );
  }
});

module.exports = LoginForm;
