'use strict';

var React = require('react/addons');
var axios = require('axios');
var ValidationMixin = require('react-validation-mixin');
var Joi = require('joi');

var Login = React.createClass({

  // componentDidMount: function() {
  //   //something will go here
  // },

  mixins: [ValidationMixin, React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  // validatorTypes: {
  //   email: Joi.string().required().label('E-mail Address'),
  //   password: Joi.string().required().label('Password')
  // },

  getInitialState: function() {
    return {
      email: '',
      password: '',
      failedLogins: 0,
      spinner: false
    };
  },

  handleSubmit: function (e) {
    this.setState({spinner: true});
    e.preventDefault();

    axios.post('/api/v1/users/login',this.state)
        .then(function(response){
          this.setState({spinner: false});
          this.context.router.transitionTo(response.data);
        }.bind(this))
        .catch(function(response){
          this.setState({
            spinner: false,
            failedLogins: this.state.failedLogins+1
          });
        }.bind(this));

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
    var loginWarning = this.state.failedLogins > 0 ? (<span className='warning'>Username or password incorrect</span>) : undefined;
    var spinner = this.state.spinner > 0 ? (<i className="fa fa-circle-o-notch fa-spin fa-2x"></i>) : undefined;
    return (
      <div className='login'>
        <h1>Login</h1>
        <form>
          <div className={this.getClasses('email')}>
            <label htmlFor='email'>E-mail Address</label>
            <input type='email' id='email' placeholder='E-mail' onBlur={this.handleValidation('email')} valueLink={this.linkState('email')}/>
            {this.getValidationMessages('email').map(this.renderHelpText)}
          </div><br/>
          <div className={this.getClasses('password')}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' placeholder='Password' onBlur={this.handleValidation('password')} valueLink={this.linkState('password')}/>
            {this.getValidationMessages('password').map(this.renderHelpText)}
          </div><br/>
            <button type='submit' onClick={this.handleSubmit}>Submit</button><div>{spinner}</div>
        </form>
        <div>{loginWarning}</div>
      </div>
    );
  }
});

module.exports = Login;
