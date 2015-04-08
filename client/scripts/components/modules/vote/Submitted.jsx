'use strict';

var React = require('react');
var BallotStore = require('../../../stores/BallotStore');

var Submitting = React.createClass({
  
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return {receipt: BallotStore.getReceipt()};
  },
  
  render: function() {
    return (
      <div>
        <p>You voted!</p>
        <p>Your receipt is: {this.state.receipt}</p>
      </div>
    );
  },

});

module.exports = Submitting;