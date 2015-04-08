'use strict';

console.log('top');

var React = require('react');
var Election = require('./Election.jsx');

var polls = [
  {
    pollName: 'Federal',
    questions:
    [
      {
        question: 'Who should be the next president?',
        instructions: 'Vote for only one.',
        options:
          [
            {name: 'Hillary Clinton', party: 'Democratic', statement:'I must be president.'},
            {name: 'Anyone But Hillary Clinton', party: 'Republican', statement: 'Her again?'}
          ]
      },
      {
        question: 'What should I have for dinner?',
        instructions: 'Eat all the things.',
        options:
          [
            {name: 'Pizza', party: 'Oven', statement: 'Cheesy goodness.'},
            {name: 'Ice Cream', party: 'Freezer', statement: 'You know I\m your favorite.'}
          ]
      }
    ]
  },
  {
    pollName: 'HR25',
    questions:
    [
      {
        question: 'Who is the most confident?',
        instructions: 'Vote for only one.',
        options:
        [
          {name: 'Tony', party: 'Meditative', statement: 'Obviously I am the most confident.'},
          {name: 'Allen', party: 'Arkansan', statement: 'I will teach you confident.'}
        ]
      }
    ]
  }
];

var VotingBooth = React.createClass({
  
  render: function() {
    this.props.polls = polls;
    return (
      <div>
        <Election
          polls={this.props.polls}
        />
      </div>
    );
  }

});

module.exports = VotingBooth;