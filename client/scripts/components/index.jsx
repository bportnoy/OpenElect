'use strict';

var React = require('react/addons');
var DefaultLayout = require('./layouts/default.jsx');
var Link = require('react-router').Link;

var IndexComponent = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  goVote: function () {
    var election = this.state.voteText;
    this.context.router.transitionTo('/vote/' + election);
  },

  whoWon: function () {
    var election = this.state.resultsText;
    this.context.router.transitionTo('/results/' + election);
  },

  getInitialState: function () {
    return {voteText: '', resultsText: ''};
  },

  render: function() {
    return(
      <div>
        <h1>Welcome to OpenElect</h1>
        <h2><Link to='electionCreate'>Create an Election</Link></h2>
        <h2>Vote in an Election:</h2><input type='text' 
                                                placeholder='Enter election ID'
                                                valueLink={this.linkState('voteText')}/>
                                        <button onClick={this.goVote}>Vote!</button>
        <h2>View Results</h2><input type='text'
                                        placeholder='Enter election ID'
                                        valueLink={this.linkState('resultsText')} /><button>Who won?</button>
        <h5><a href='/docs/api/index.html'>API Reference</a></h5>
        <h5><a href='/docs/styleguide/index.html'>Style Guide</a></h5>
      </div>
    );
  }

});

module.exports = IndexComponent;
