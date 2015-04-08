'use strict';

var React = require('react');
var Election = require('./Election.jsx');
var BallotStore = require('../../stores/BallotStore');
var BallotActions = require('../../actions/BallotActions');

var VotingBooth = React.createClass({
  
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    this.getElection();
    return null;
  },

  getElection: function(){
    //ajax call to get the election object
    //var polls = election.polls;
    var electionId = 1;
    var userId = 1;
    BallotActions.setUserAndElection(userId, electionId);
  },
  
  render: function() {
    // var electionId = 1;
    // var userId = 1;
    console.log(this.context.router.getCurrentParams());
    this.props.polls = polls;
    return (
      <div>
        <Election
          polls={this.props.polls}
        />
      </div>
    );
  },

  _onChange: function () {
    this.setState();
  }

});

module.exports = VotingBooth;

var polls = [
  {
    pollName: 'Federal',
    questions:
    [
      {
        title: 'Who should be the next president?',
        instructions: 'Vote for only one.',
        options:
          [
            {name: 'Hillary Clinton', party: 'Democratic', statement:'I must be president.', id: 1},
            {name: 'Anyone But Hillary Clinton', party: 'Republican', statement: 'Her again?', id: 2}
          ],
        id: 1
      },
      {
        title: 'What should I have for dinner?',
        instructions: 'Eat all the things.',
        options:
          [
            {name: 'Pizza', party: 'Oven', statement: 'Cheesy goodness.', id: 1},
            {name: 'Ice Cream', party: 'Freezer', statement: 'You know I\m your favorite.', id: 2}
          ],
        id: 2
      }
    ]
  },
  {
    pollName: 'HR25',
    questions:
    [
      {
        title: 'Who is the most confident?',
        instructions: 'Vote for only one.',
        options:
        [
          {name: 'Tony', party: 'Meditative', statement: 'Obviously I am the most confident.', id: 1},
          {name: 'Allen', party: 'Arkansan', statement: 'I will teach you confident.', id: 2}
        ],
        id: 3
      }
    ]
  }
];