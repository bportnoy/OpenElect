'use strict';

var React = require('react');
var _ = require('underscore');
var stores = require('../../stores');

var select = require('./statefulinput/select.jsx');

var StatefulInput = React.createClass({
	
	store: stores[this.props.store],
	updateProperty: this.props.updates,
	type: this.props.type,
	
	render: function(){
		
		return (
			
		);
	
	}

});

module.exports = StatefulInput;