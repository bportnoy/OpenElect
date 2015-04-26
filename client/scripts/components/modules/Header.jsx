'use strict';

var React = require('react');
var Navbar = require('../modules/landing/nav.jsx');
var Link = require('react-router').Link;

var Header = React.createClass({

  render: function() {
    return (
      <div className='header'>
        <h1><Link to='app'>OpenElect</Link></h1>
        <p><Link to='dashboard'>My Account</Link></p>
        <p><Link to='signup'>Sign Up</Link></p>
        <p><a href='/api/v1/users/logout'>Log Out</a></p>
        <p><Link to='login'>Log In</Link></p>
      </div>
    );
  },
});

module.exports = Header;
