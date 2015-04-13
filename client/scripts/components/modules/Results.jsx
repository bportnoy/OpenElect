'use strict';

var React = require('react');
var axios = require('axios');

var Results = React.createClass({

  getInitialState: function() {

    function getQuestions() {
      return axios.get('/elections/'+{this.id});
    }

    function getResults() {
      return axios.get('/elections/results/'+{this.id});
    }

    var election = axios.all([getQuestions(), getResults()])
      .then(axios.spread(function(allQuestions, allResults) {
        var data = {};

        data.electionName = allQuestions.props.pollName;
        data.allQuestions = allQuestions.props.questions;
        data.allResults = allResults.props.results.questions;

        return data;
      }));
  },

  render: function() {
    var results = [];

    this.allQuestions.forEach(function(element) {
      questions.push(
        <h5>element.question</h5>
        insertOptions(element.);
      );
    });

    function insertOptions() {
    for (var optIndex = 0; optIndex < this.allQuestions.options.length; optIndex++ ) {
      results.push(
        <h5 className='result-question'>this.allQuestions[qIndex].question</h5>
        <h5 className='result-vote-count'>
          <span className='result-option-name'>this.allQuestions[].</span>
          <span className='result-option-party'>this.allQuestions[idx]</span>
          <span className='result-option-votes'>this.allResults[idx]</span>
        </h5>
      );

    }


    return (
      <h1>Election Results</h1>
      <h3>{ this.electionName }</h3>

      <h1>Questions</h1>


      // for each question at index, print question index and prompt
      <h3>{ index }. { election.props.questions[index].question }<h3>
        // for each option n, print option and votecount
        <p>
          <span>Name: { election.props.questions[index].options[n].name }</span>
          <span>Party: { election.props.questions[index].options[n].party }</span>
          <span>Vote count: { result.props.results.questions[index].totals[n].votes }</span>
        </p>
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
