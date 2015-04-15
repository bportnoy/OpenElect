'use strict';

var React = require('react');
var Election = require('./Election.jsx');
var BallotStore = require('../../../stores/BallotStore');
var BallotActions = require('../../../actions/BallotActions');
var axios = require('axios');
var Spinner = require('../../widgets/Spinner.jsx');

var VotingBooth = React.createClass({
  
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    this.getElection();
    return {polls: null};
  },

  getElection: function(){
    //ajax call to get the election object
    //var polls = election.polls;
    var electionId = this.context.router.getCurrentParams().electionId;
    var userId = 1;
    BallotActions.setUserAndElection(userId, electionId);
    axios.get('/api/v1/elections/vote/' + electionId)
          .then(function(response){
            this.setState({polls: response.data});
          }.bind(this))
          .catch(function(response){
            console.error(response);
          });
  },
  
  render: function() {
    if (this.state.polls === null) return (<Spinner/>);

    return (
      <div>
        <Election
          polls={this.state.polls}
        />
      </div>
    );
  },

  _onChange: function () {
    this.setState();
  }

});

module.exports = VotingBooth;

// var polls = [
//   {
//     pollName: 'Federal',
//     questions:
//     [
//       {
//         title: 'Who should be the next president?',
//         instructions: 'Vote for only one.',
//         options:
//           [
//             {name: 'Hillary Clinton', party: 'Democratic', statement:'I must be president.', id: 1},
//             {name: 'Anyone But Hillary Clinton', party: 'Republican', statement: 'Her again?', id: 2}
//           ],
//         id: 1
//       },
//       {
//         title: 'What should I have for dinner?',
//         instructions: 'Eat all the things.',
//         options:
//           [
//             {name: 'Pizza', party: 'Oven', statement: 'Cheesy goodness.', id: 1},
//             {name: 'Ice Cream', party: 'Freezer', statement: 'You know I\m your favorite.', id: 2}
//           ],
//         id: 2
//       }
//     ]
//   },
//   {
//     pollName: 'HR25',
//     questions:
//     [
//       {
//         title: 'Who is the most confident?',
//         instructions: 'Vote for only one.',
//         options:
//         [
//           {name: 'Tony', party: 'Meditative', statement: 'Obviously I am the most confident.', id: 1},
//           {name: 'Allen', party: 'Arkansan', statement: 'I will teach you confident.', id: 2}
//         ],
//         id: 3
//       }
//     ]
//   }
// ];

// var placeholder = [{
//     name: '',
//     question:
//     [
//       {
//         name: '',
//         description: '',
//         options:
//         [
//           {name: '', party: '', statement: '', id: null},
//           {name: '', party: '', statement: '', id: null}
//         ],
//         id: null
//       }
//     ]
//   }];