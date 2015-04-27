'use strict';

var React = require('react');
var Navbar = require('../modules/landing/nav.jsx');
var Link = require('react-router').Link;
var UserStore = require('../../stores/UserStore');

var Header = React.createClass({

  componentDidMount: function(){
    UserStore.addChangeListener(this._onChange);
  },

  componentWillMount: function(){
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({loggedIn: !!UserStore.getUser()});
  },

  getInitialState: function(){
    return {loggedIn: !!UserStore.getUser()};
  },

  render: function() {

    var logInOut = this.state.loggedIn ? (<p><a href='/api/v1/users/logout'>Log Out</a></p>)
    : (<p><Link to='login'>Log In</Link></p>);

    var home = this.state.loggedIn ? (<h1><Link to='dashboard'>OpenElect</Link></h1>)
    : (<h1><Link to='app'>OpenElect</Link></h1>);

    return (
      <div className='header'>
        <h1><Link to='app'>OpenElect</Link></h1>
        <p><Link to='dashboard'>My Account</Link></p>
        <p><Link to='signup'>Sign Up</Link></p>
        <div>{logInOut}</div>
      </div>
    );
  },
});

module.exports = Header;
