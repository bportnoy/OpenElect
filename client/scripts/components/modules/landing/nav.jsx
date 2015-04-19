'use strict';

var React = require('react');
var Link = require('react-router').Link;

var Navbar = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    return (
      <ul class="navbar">
        <li class="navbar-list"><h2><Link to='dashboard'>OpenElect</Link></h2></li>
        <li class="navbar-list"><h2><Link to='dashboard'>My Account</Link></h2></li>
        <li class="navbar-list"><h2><Link to='electionCreate'>Create an Election</Link></h2></li>
        <li class="navbar-list"><h2><Link to='dashboard'>Vote Now</Link></h2></li>
      </ul>
    );
  }
});

module.exports = Navbar;
