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


var SignUpForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    first_name: React.PropTypes.string,
    last_name: React.PropTypes.string,
    email: React.PropTypes.string,
    password: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
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
    console.log(data)
    axios.post('/api/v1/users/signup',{
      user: data
    }).then(function(response){
      this.context.router.transtionTo(response.data);
    });

  },

  render: function () {
    return (
      <div>
        <Modal className='signup-modal'
               isOpen={this.state.modalIsOpen}
               onRequestClose={this.closeModal}>
          <Formsy.Form className='signup-form' onValidSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
            <h1>Welcome to OpenElect</h1>
            <h3>Register for a new account</h3>
            <label htmlFor='first_name'>First Name</label>
            <TextInputField name="first_name"
                        validations={{
                          matchRegexp: /^[a-zA-Z0-9\-\s]{1,}$/,
                          minLength: 1,
                          maxLength: 50
                        }}
                        validationErrors={{
                          matchRegexp: 'Cannot contain symbols',
                          minLength: 'Required',
                          maxLength: 'Cannot be more than 50 characters'
                        }} required/>
            <label htmlFor='last_name'>Last Name</label>
            <TextInputField name="last_name"
                        validations={{
                          matchRegexp: /^[a-zA-Z0-9\-\s]{1,}$/,
                          minLength: 1,
                          maxLength: 50
                        }}
                        validationErrors={{
                          matchRegexp: 'Cannot contain symbols',
                          minLength: 'Required',
                          maxLength: 'Last name cannot be more than 50 characters'
                        }} required/>
            <label htmlFor='email'>Email</label>
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
            <label htmlFor='Password'>Password</label>
            <PasswordInputField name="password"
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
            <button type="submit" disabled={!this.state.canSubmit} onClick={this.closeModal}>Register to Vote</button>
            <div className='login-link'><a href='#'>Already registered? Sign into your account</a></div>
          </Formsy.Form>
        </Modal>
      </div>
    );
  }
});

module.exports = SignUpForm;
