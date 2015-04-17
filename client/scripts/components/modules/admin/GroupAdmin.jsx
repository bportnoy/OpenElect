'use strict';

var React = require('react');
var axios = require('axios');

var GroupAdmin = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    // return this.context.router.getCurrentParams();
    return null;
  },

  render: function() {
      return (
          <div></div>
      );
  }
});

module.exports = GroupAdmin;


