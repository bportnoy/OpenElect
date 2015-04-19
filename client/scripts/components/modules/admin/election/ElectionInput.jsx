'use-strict';

var React = require('react');
var ElectionActions = require('../../../../actions/ElectionActions');

var ElectionInput = React.createClass({

	handleChange: function(event) {
		ElectionActions.changeElectionData( this.props.property, event.target.value );
		this.setState({value: event.target.value});
	},

	handleSave: function(event) {
		event.preventDefault();
		ElectionActions.postElectionData( this.props.property, this.state.value );
	},

	handleUndo: function(event) {
		event.preventDefault();
		ElectionActions.undoElectionChange( this.props.property );
	},

	render: function() {
		var input;
		switch ( this.props.type ) { // different inputs are different!

			case 'text' || 'number':
				input = ( <input className={ this.props.name } type={ this.props.type } name={ this.props.name } value={ this.props.value } onChange={this.handleChange} /> );
			break;

			case 'textarea':
				input = ( <textarea className={ this.props.name } name={ this.props.name } value={ this.props.value } onChange={ this.handleChange } /> );
			break;

			default: // no op

		}

		return(
			<div className="electionInput">
				{input}
				<button action="submit" onClick={this.handleSave}>Save</button>
				<button action="submit" onClick={this.handleUndo}>Undo Changes</button>
			</div>
		);
	
	}

});

module.exports = ElectionInput;