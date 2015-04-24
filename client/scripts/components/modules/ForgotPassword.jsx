'use strict';

var React = require('react/addons');
var axios = require('axios');
var Formsy = require('formsy-react');
var Modal = require('react-modal');
var TextInputField = require('../widgets/TextInputField.jsx');
var PasswordInputField = require('../widgets/PasswordInputField.jsx');
var Router = require('react-router');
var Link = Router.Link;
var Spinner = ('../widgets/Spinner.jsx');


var appElement = document.getElementById('app-view');

Modal.setAppElement(appElement);
Modal.injectCSS();


var ForgotPassword = React.createClass({

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
      modalIsOpen: true,
      spinner: false
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
    // this.setState({spinner: true});
    axios.get('/api/v1/users/' + data.email + '/resetPassword')
      .then(function(response){
        this.setState({success: response.data});
        setTimeout(function(){
          this.closeModal;
          this.context.router.transitionTo('index');
        }.bind(this), 5000);
      }.bind(this))
      .catch(function(response){
        this.setState({
          warning: response.data,
          spinner: false
        });
      }.bind(this));
  },

  render: function () {
    var loginWarning = this.state.warning ? this.state.warning : undefined;
    var successMessage = this.state.success ? this.state.success : undefined;
    var spinner = this.state.spinner ? <Spinner/> : undefined;
    return (
      <div>
        <Modal className='login-modal'
               isOpen={this.state.modalIsOpen}
               onRequestClose={this.closeModal}>
          <Formsy.Form className='login-form' onValidSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
            <i className="fa fa-times x-close-icon" onClick={this.closeModal}></i>
            <h1>Reset Password</h1>
            <label htmlFor='email'>Enter Your E-mail</label>
            <TextInputField name="email"
                        validations={{
                          isEmail: true,
                          minLength: 0,
                          maxLength: 50,
                        }}
                        validationErrors={{
                          isEmail: 'Enter a valid email address',
                          minLength: 'Required',
                          maxLength: 'Email cannot be more than 50 characters'
                        }} required/>
            <div className='error-message login-warning'><span>{loginWarning}</span></div>
            <div className='success-message login-warning'><span>{successMessage}</span></div>
            <button type="submit" disabled={!this.state.canSubmit}>Change Password</button><div>{spinner}</div>
          </Formsy.Form>
        </Modal>
      </div>
    );
  }
});

module.exports = ForgotPassword;
