'use strict';

var React = require('react/addons');
var axios = require('axios');

var Login = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  // componentDidMount: function() {
  //   //something will go here
  // },

  // getInitialState: function() {
  //   //something will go here
  // },

  getInitialState: function() {
    return {
      email: '',
      password: '',
      failedLogins: 0,
      spinner: false
    };
  },

  submit: function (e) {
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

  render: function() {
    var loginWarning = this.state.failedLogins > 0 ? (<span className='warning'>Username or password incorrect</span>) : undefined;
    var spinner = this.state.spinner > 0 ? (<i class="fa fa-circle-o-notch fa-spin fa-2x"></i>) : undefined;
    return (
      <div className='login'>
        <h1>Login</h1>
        <form>
          <label htmlFor='email'>E-mail Address</label>
          <input type='email' id='email' placeholder='E-mail' valueLink={this.linkState('email')}/>
          <br/>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' placeholder='Password' valueLink={this.linkState('password')}/>
          <br/>
          <button type='submit' onClick={this.submit}>Submit</button><div>{spinner}</div>
        </form>
        <div>{loginWarning}</div>
      </div>
    );
  },
});

module.exports = Login;
