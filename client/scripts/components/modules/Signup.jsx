'use strict';

var React = require('react/addons');
var axios = require('axios');

var Signup = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  // componentDidMount: function() {
  //   //something will go here
  // },

  // getInitialState: function() {
  //   //something will go here
  // },

  getInitialState: function() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };
  },

  submit: function (e) {

    e.preventDefault();

    axios.post('/api/v1/users/signup',{
      user: this.state
    }).then(function(response){
      console.log(response);
    });

  },

  render: function() {
    return (
      <div className='signup'>
        <h1>Sign up for Open Elect</h1>
        <form>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' id='firstName' placeholder='Franklin' valueLink={this.linkState('first_name')}/>
          <br/>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' id='lastName' placeholder='Roosevelt' valueLink={this.linkState('last_name')}/>
          <br/>
          <label htmlFor='email'>E-mail Address</label>
          <input type='email' id='email' placeholder='fdr@whitehouse.gov' valueLink={this.linkState('email')}/>
          <br/>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' valueLink={this.linkState('password')}/>
          <br/>
          <button type='submit' onClick={this.submit}>Submit</button>
        </form>
      </div>
    );
  },
});

module.exports = Signup;
