'use strict';

var React = require('react');
var BallotStore = require('../../../stores/BallotStore');
var Moment = require('moment');

var Submitting = React.createClass({
  
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return BallotStore.getReceipt();
  },
  
  render: function() {
    return (
      <div className='receiptBox'>
        <h1 className='text-center'>Your ballot was recorded at:</h1>
        <h2 className='text-center'>{Moment(this.state.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</h2>
        <div className='text-center'>
          <h3>Your receipt is:</h3>
          <span id='receipt' className='text-center'>{this.state.receipt}</span>
        </div>
      </div>
    );
  },

});

module.exports = Submitting;