'use strict';

var React = require('react');
var _ = require('underscore');

var PollListItem = React.createClass({
	render: function() {
		console.log('inside PollListItem', this.props);
		return (
			<li>
				item
			</li>
		);
	}
});

module.exports = PollListItem;