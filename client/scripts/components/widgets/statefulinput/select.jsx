'use strict';

var React = require('react');
var _ = require('underscore');

var select = React.createClass({
	
	options: [],

	createOptions: function() {
		_.each(this.props.options, function(option){
			
		});
	},

	render: function() {
		
		return (
			<select>
				{options}
			</select>
		);
	
	}

});

module.exports = select;