'use strict';

var React = require('react');

var Submitting = React.createClass({
  
  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    setTimeout(this.checkSubmit, 1000);
  },

  getInitialState: function () {
    return null;
  },
  
  render: function() {
    return (
      <div>
        <div id='submitting'>
          <h1>Encrypting & Sending Your Ballot</h1>
          <i className="fa fa-circle-o-notch fa-spin fa-5x"></i>
        </div>        
      </div>
    );
  },

});

module.exports = Submitting;