'use strict';

var React = require('react');
var moment = require('moment');
var Link = require('react-router').Link;

var ListElection = React.createClass({
	render: function() {
		if ( this.props.start ) var start = moment(this.props.start).format('MMMM Do YYYY');
		return(
			<li className="election">
				<h3 className="title"><Link to='electionAdmin' params={{id: this.props.id}}>{this.props.name}</Link></h3>
				<p className="description">{this.props.description}</p>
				<span className="start-date">{start}</span>
				<Link className="btn" to='electionAdmin' params={{id: this.props.id}}>Edit Election</Link>
			</li>
		);
	}
});

module.exports = ListElection;