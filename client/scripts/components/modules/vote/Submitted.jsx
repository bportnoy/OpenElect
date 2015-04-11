'use strict';

var React = require('react');
var BallotStore = require('../../../stores/BallotStore');

var Submitting = React.createClass({
  
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return BallotStore.getReceipt();
  },
  
  render: function() {
    return (
      <div>
        <p>Your ballot was recorded at: {this.state.createdAt}</p>
        <p>Your receipt is: {this.state.receipt}</p>
      </div>
    );
  },

});

module.exports = Submitting;