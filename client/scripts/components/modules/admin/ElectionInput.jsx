'use-strict';

var React = require('react');
var ElectionActions = require('../../../actions/ElectionActions');

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
	
		switch ( this.props.type ) { // different inputs are different

			case 'text' || 'number':
				this.input = ( <input className={ this.props.name } type={ this.props.type } name={ this.props.name } value={ this.props.value } onChange={this.handleChange} /> );
			break;

			default: // no op

		}

		return(
			<div className="electionInput">
				{this.input}
				<button action="submit" onClick={this.handleSave}>Save</button>
				<button action="submit" onClick={this.handleUndo}>Undo Changes</button>
			</div>
		);
	
	}

});

module.exports = ElectionInput;