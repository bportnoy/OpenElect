'use strict';

var React = require('react');
var moment = require('moment');
var Link = require('react-router').Link;

var ListElection = React.createClass({
	render: function() {
		var start = moment(this.props.start).format('MMMM Do YYYY');
		return(
			<Link to='electionAdmin' params={{id: this.props.id}}>
				<li className="election">
					<h3 className="title">{this.props.name}</h3>
					<p className="description">{this.props.description}</p>
					<span className="start-date">{start}</span>
				</li>
			</Link>
		);
	}

});

module.exports = ListElection;