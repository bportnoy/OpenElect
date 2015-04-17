'use strict';

var React = require('react/addons');
var axios = require('axios');
var ValidationMixin = require('react-validation-mixin');
var Joi = require('joi'); // replace with joi-react shim

var SignUp = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  // componentDidMount: function() {
  //   //something will go here
  // },

  mixins: [ValidationMixin, React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  // validatorTypes: {
  //   first_name: Joi.string().required().label('First Name'),
  //   last_name: Joi.string().required().label('Last Name'),
  //   email: Joi.string().email().required().label('E-mail Address'),
  //   password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required().label('Password')
  // },

  getInitialState: function() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };
  },

  handleSubmit: function (e) {

    e.preventDefault();

    axios.post('/api/v1/users/signup',{
      user: this.state
    }).then(function(response){
      this.context.router.transtionTo(response.data);
    });

  },

  getClasses: function(field) {
    return React.addons.classSet({
      'form-group': true,
      'has-error': !this.isValid(field)
    });
  },

  renderHelpText: function(message) {
    return (
      <span className='help-block'>{message}</span>
      );
  },

  render: function() {
    console.log(Joi);
    return (
      <div className='signup'>
        <h1>Sign up for Open Elect</h1>
        <form>
          <div className={this.getClasses('firstName')}>
            <label htmlFor='firstName'>First Name</label>
            <input type='text' id='firstName' placeholder='Franklin' valueLink={this.linkState('first_name')}/>
            {this.getValidationMessages('firstName').map(this.renderHelpText)}
          </div><br/>
          <div className={this.getClasses('lastName')}>
            <label htmlFor='lastName'>Last Name</label>
            <input type='text' id='lastName' placeholder='Roosevelt' valueLink={this.linkState('last_name')}/>
            {this.getValidationMessages('lastName').map(this.renderHelpText)}
          </div><br/>
          <div className={this.getClasses('email')}>
            <label htmlFor='email'>E-mail Address</label>
            <input type='email' id='email' placeholder='fdr@whitehouse.gov' valueLink={this.linkState('email')}/>
            {this.getValidationMessages('email').map(this.renderHelpText)}
          </div><br/>
          <div className={this.getClasses('password')}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' valueLink={this.linkState('password')}/>
            {this.getValidationMessages('password').map(this.renderHelpText)}
          </div><br/>
            <button type='submit' onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  },
});


module.exports = SignUp;
