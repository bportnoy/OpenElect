'use strict';

var Poll = require('./Poll.jsx');
var React = require('react');


var Election = React.createClass({
  render: function() {
    var allPolls = this.props.polls;
    var polls = [];

    allPolls.forEach(function(poll){
      polls.push(<Poll name={poll.pollName} questions={poll.questions} />);
    });

    return (
      <section id='election'>
        <div className='poll-list'>{polls}</div>
      </section>
    );
  }

});

module.exports = Election;