'use strict';

var React = require('react');
var Ink = require('react-ink');
var moment = require('moment');
var Link = require('react-router').Link;

var ElectionActions = require('../../../actions/ElectionActions');

var ListElection = React.createClass({
	setElection: function() {
		ElectionActions.setCurrentElection(this.props.id);
	},

	render: function() {
		if ( this.props.start ) {
			console.log('props');
			var start = ( <span className="start-date">this.props.start.format('MMMM Do YYYY')</span> );
		}
		return(
			<li className="election">
				<h3 className="title"><Link to='electionAdmin' onClick={this.setElection} params={{id: this.props.id}}>{this.props.name}</Link></h3>
				<p className="description">{this.props.description}</p>
				{start}
				<Link className="btn" to='electionAdmin' onClick={this.setElection} params={{id: this.props.id}}>Edit Election</Link>
			</li>
		);
	}
});

module.exports = ListElection;