'use strict';

var React = require('react');

var Answer = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Option {this.props.number}</h3>
        <input type='text' placeholder='' />
      </div>
    );
  }
});

module.exports = Answer;
