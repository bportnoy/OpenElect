'use strict';

var React = require('react');

var VotingBooth = React.createClass({
  render: function() {
    return (
      <div>
        <Header>
        <Election
          ballots={this.props.ballots}
        />
        <SubmitButton>
        <Footer>
    );
  }

});

module.exports = VotingBooth;