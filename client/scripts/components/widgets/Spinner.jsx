var React = require('react');

var Spinner = React.createClass({
	render: function() {
		return (
			<i className="fa fa-circle-o-notch fa-spin fa-5x page-loading"></i>
		);
	}
});

module.exports = Spinner;