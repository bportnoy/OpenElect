'use strict';

var React = require('react');
var Ink = require('react-ink');
var moment = require('moment');
var Link = require('react-router').Link;
var axios = require('axios');
var request = require('superagent');

var ElectionActions = require('../../../actions/ElectionActions');

var ListElection = React.createClass({

	mixins: [React.addons.LinkedStateMixin],

	contextTypes: {
	  router: React.PropTypes.func
	},

	getInitialState: function() {
	  return {accepting_votes: this.props.data.accepting_votes};
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

	toggleElection: function(e){
		e.preventDefault();
		if (!this.props.data.accepting_votes){
			request.get('/api/v1/elections/update/' + this.props.id)
			.query({open: true})
			.end(function(err, response){
				this.setState({accepting_votes: response.body.accepting_votes});
			}.bind(this));
		} else {
			if(confirm('Are you sure you wish to close this election? Results will be tabulated and no further votes accepted.')){
				request.post('/api/v1/elections/results/' + this.props.id)
				.end(function(err, response){
					console.log(response);
				});
			}
		}
		// axios.post('api/v1/elections/update/' + this.props.id, {accepting_votes: !this.state.accepting_votes})
		//   .then(function(response){
		//   	this.setState({accepting_votes: response.data.accepting_votes});
		//   }.bind(this))
		//   .catch(function(response){
		//     console.log(response);
		//   }.bind(this));
	},

	render: function() {
		if ( this.props.start ) {
			var start = ( <span className="start-date">{this.props.start.format('MMMM Do YYYY')}</span> );
		}
		// Check the current state of election and show the responding options
		if (this.state.accepting_votes){
			var toggleButton = (<button onClick={this.toggleElection}>END THIS ELECTION</button>)
		} else {
			var toggleButton = (<button onClick={this.toggleElection}>START THIS ELECTION</button>)
		}

		return(
			<li className="election">
				<h3 className="title"><Link to='electionAdmin' onClick={this.setElection} params={{id: this.props.id}}>{this.props.name}</Link></h3>
				<p className="description">{this.props.description}</p>
				{start}
				<Link className="btn" to='electionAdmin' onClick={this.setElection} params={{id: this.props.id}}> Edit Election</Link>

				<div>
					{toggleButton}
					<button onClick={this.goVote}>VOTE NOW</button>
					<button onClick={this.whoWon}>VIEW RESULTS</button>
				</div>

			</li>
		);
	}

});

module.exports = ListElection;
