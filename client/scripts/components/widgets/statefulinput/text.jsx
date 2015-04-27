'use strict';

var React = require('react');
var _ = require('underscore');

var select = React.createClass({

  render: function() {
    
    return (
      <input type="text" placeholder={ this.props.placeholder } />
    );
  
  }

});

module.exports = select;