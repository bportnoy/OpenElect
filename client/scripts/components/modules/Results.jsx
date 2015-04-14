'use strict';

var React = require('react');
var axios = require('axios');

var Results = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {

    // Helper function to get election response object
    function getQuestions(election_id) {
      return axios.get( '/elections/' + election_id );
    }

    // Helper function to get results response object
    function getResults(election_id) {
      return axios.get( '/elections/results/' + election_id );
    }

    // Get election questions and results
    var election_id = this.context.router.getCurrentParams().electionId;
    var election = axios
      .all([getQuestions(election_id), getResults(election_id)])
      .then(axios.spread(function(election, resultSummary) {
        return {
          electionName: election.props.pollName,
          election: election.props.questions,
          resultSummary: resultSummary.props.results.questions,
        };
      }));
  },

  render: function() {
    var results = [];

    // Helper function to get option information and vote count for a question
    function insertVoteCounts(index) {
      for (var j = 1; j <= this.resultSummary[index].totals.length; j++) {
        return(
          <h5><span className='result-name'>{ this.election[index].options[j].name }</span>
          <span className='result-party'>this.election[index].options[j].party</span>
          <span className='result-votes'>this.resultSummary[index].totals[j].votes</span></h5>
        );
      }
    }

    // Add formatted questions to results array
    for (var i = 1; i <= this.resultSummary.length; i++ ) {
      results.push(
        <div className='question-vote-count'>
          <h2>Question { i }</h2>
          <h5>{ this.election[i].question }</h5>
          <h2>Response</h2>
          { insertVoteCounts(i) }
        </div>
      );
    }

    return (
      <div className='result'>
        <h1>Election Results for</h1>
        <h3>{ this.electionName }</h3>
        <div>{ results }</div>
      </div>
    )
  }
});

module.exports = Results;

// questions object
// [
//   {
//     pollName: 'Federal',
//     questions: [
//       {
//         question: 'Who should be the next president?',
//         instructions: 'Vote for only one.',
//         options: [
//             {name: 'Barack Obama', party: 'Democratic', statement:'The change we need.'},
//             {name: 'John McCain', party: 'Republican', statement: 'I'm a maverick.'}
//         ]
//       },
//       {
//         question: 'Who should represent California's 8th Congressional District?',
//         instructions: 'Vote for only one.',
//         options: [
//             {name: 'Nancy Pelosi', party: 'Democratic', statement: 'I have been doing this forever.'},
//             {name: 'Cindy Sheehan', party: 'Independent', statement: 'It's worth a shot.'},
//             {name: 'Dana Walsh', party: 'Republican', statement: 'I don't have a chance.'}
//         ]
//       }
//     ]
//   },
//   {
//     pollName: 'Municipal',
//     questions: [
//       {
//         question: 'Who should represent the Board of Supervisors for District 11?',
//         instructions: 'Vote for only one.',
//         options: [
//           {name: 'John Avalos', party: 'Democratic', statement: 'I won.'},
//           {name: 'Asha Safai', party: 'Democratic', statement: 'I came close!'}
//         ]
//       }
//     ]
//   }
// ];

// result object
// {
//   "results": {
//     "election_id": 21231,
//     "questions": [
//       {
//         "question": {
//           "id": 583421,
//         },
//         "totals": [
//           {
//             "id": 1,
//             "votes": 100
//           },
//           {
//             "id": 2,
//             "votes": 100
//           },
//           {
//             "id": 3,
//             "votes": 200
//           },
//         ]
//       }
//     ]
//   }
// }
