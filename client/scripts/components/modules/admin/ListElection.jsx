'use strict';

var React = require('react');
var moment = require('moment');

var ListElection = React.createClass({
	render: function() {
		var start = moment(this.props.start).format('MMMM Do YYYY');
		return(
			<li className="election">
				<h3 className="title">{this.props.name}</h3>
				<p className="description">{this.props.description}</p>
				<span className="start-date">{start}</span>
			</li>
		);
	}

});

module.exports = ListElection;