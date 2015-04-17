'use strict';

var React = require('react');

var Header = React.createClass({

  // componentDidMount: function() {
  //   //something will go here
  // },

  // getInitialState: function() {
    // this.state.user.name;
  // },

  render: function() {
    return (
      <div className='header'>
        <h1>OpenElect</h1>
        <p><a href='/login'>Login</a></p>
        <p><a href='/signup'>Register</a></p>
        <p><a href='#'>My Account</a></p>
        <p>Signed in as <a href='#'>John Doe</a></p>
      </div>
    );
  },
});

module.exports = Header;
