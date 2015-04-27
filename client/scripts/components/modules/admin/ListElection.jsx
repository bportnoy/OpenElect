'use strict';

var React = require('react');
var Ink = require('react-ink');
var moment = require('moment');
var Link = require('react-router').Link;
var axios = require('axios');

var ElectionActions = require('../../../actions/ElectionActions');

var ListElection = React.createClass({

	mixins: [React.addons.LinkedStateMixin],

	contextTypes: {
	  router: React.PropTypes.func
	},

	getInitialState: function() {
	  return {accepting_votes: false};
	},

	whoWon: function () {
	  this.context.router.transitionTo('/elections/' + this.props.id);
	},

  goVote: function () {
    this.context.router.transitionTo('/vote/' + this.props.id);
  },

	setElection: function() {
		ElectionActions.setCurrentElection(this.props.id);
	},

	toggleElection: function(){
		axios.post('api/v1/elections/update/' + this.props.id, {accepting_votes: !this.state.accepting_votes})
		  .then(function(response){
		  	this.setState({accepting_votes: response.data.accepting_votes});
		  }.bind(this))
		  .catch(function(response){
		    console.log(response);
		  }.bind(this));
	},

	render: function() {
		if ( this.props.start ) {
			var start = ( <span className="start-date">{this.props.start.format('MMMM Do YYYY')}</span> );
		}
		// Check the current state of election and show the responding options
		if (this.state.accepting_votes){
			var toggleButton = (<button onClick={this.toggleElection}>Stop this election</button>)
		} else {
			var toggleButton = (<button onClick={this.toggleElection}>Start this election</button>)
		}

		return(
			<li className="election">
				<h3 className="title"><Link to='electionAdmin' onClick={this.setElection} params={{id: this.props.id}}>{this.props.name}</Link></h3>
				<p className="description">{this.props.description}</p>
				{start}
				<Link className="btn" to='electionAdmin' onClick={this.setElection} params={{id: this.props.id}}> Edit Election</Link>

				<div>
					{toggleButton}
					<button onClick={this.goVote}>Vote!</button>
					<button onClick={this.whoWon}>Who won?</button>
				</div>

			</li>
		);
	}

});

module.exports = ListElection;
