'use strict';

var React = require('react');

var Spinner = React.createClass({

	render: function() {
		return (
      <i className="fa fa-circle-o-notch fa-spin fa-3x page-loading"></i>
		);
	}
  
});

module.exports = Spinner;
