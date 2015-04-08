'use strict';

var React = require('react');
var BallotStore = require('../../../stores/BallotStore');
var BallotActions = require('../../../actions/BallotActions');


var Submitting = React.createClass({
  
  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    setTimeout(this.checkSubmit, 1000);
  },

  checkSubmit: function() {
    if (BallotStore.checkSubmit()){
      this.context.router.transitionTo('submitted');
    }
    else setTimeout(this.checkSubmit, 1000);
  },

  getInitialState: function () {
    BallotActions.submitBallot();
    return null;
  },
  
  render: function() {
    return (
      <div>
      <p>Submitting your ballot...</p>
      </div>
    );
  },

});

module.exports = Submitting;