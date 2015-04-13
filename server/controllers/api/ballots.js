/**
 * Ballot Endpoint Controller
 */

'use strict';

var Ballot = require('../../database/models/ballot');
var Election = require('../../database/models/election');

var ballots = {
	create: function(req, res) {
      //grab the ballot from the request
      var receivedBallot = req.body.ballot;
      //first, check that the election is still open.
      Election.forge({id: receivedBallot.election_id})
              .fetch()
              .then(function(election){
                if (!election) res.send(400, 'Error: election not found.');
                //TODO: re-enable check for accepting votes
                // if (!election.get('accepting_votes')) res.send(403, 'This election is no longer accepting votes.');
                //the election exists and is accepting votes, so let's enter this ballot
                Ballot.forge({election_id: receivedBallot.election_id, user_id: receivedBallot.user_id})
                      .fetch()
                      .then(function(ballot){
                        //check to make sure the user hasn't already voted
                        // if (ballot) res.send(403, 'You have already voted in this election.'); //need to re-enable
                        Ballot.forge(
                          {
                            election_id: receivedBallot.election_id,
                            user_id: receivedBallot.user_id,
                            choices: receivedBallot.response
                          }).save()
                            .then(function(ballot){
                              //todo: hash ballot
                              var hash = 'kj23qlkjasdf';
                              var response = { ballot_id: ballot.get('id'),
                                                 receipt: hash,
                                                 election_id: ballot.get('election_id'),
                                                 created_at: ballot.get('created_at') };
                              res.send(201, response);
                            });// save ballot
                      });//fetch ballot
              });//fetch election
	}
};

module.exports = ballots;