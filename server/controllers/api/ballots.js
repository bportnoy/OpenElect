/**
 * Ballot Endpoint Controller
 */

'use strict';

var Ballot = require('../../database/models/ballot');
var Election = require('../../database/models/election');
var Security = require('../security');

var uuid = require('uuid');

var ballots = {

	create: function(req, res) {
    //grab the ballot from the request
    var receivedBallot = req.body.encryptedBallot;
    var receivedResponse = req.body.response;

    if (receivedBallot){
      //first, check that the election is still open.
      Election.forge({id: req.body.election_id})
        .fetch()
        .then(function(election){
          if (!election) res.send(400, 'Error: election not found.');

          //TODO: re-enable check for accepting votes
          if (!election.get('accepting_votes')) res.send(403, 'This election is no longer accepting votes.');

          //the election exists and is accepting votes, so let's enter this ballot
          Ballot.forge({election_id: req.body.election_id, user_id: req.user.id})
            .fetch()
            .then(function(ballot){
              //check to make sure the user hasn't already voted
              if (ballot) res.send(403, 'You have already voted in this election.'); //TODO: need to re-enable
              Ballot.forge({
                  id: uuid.v4(),
                  election_id: req.body.election_id,
                  user_id: req.user.id,
                  encrypted: receivedBallot
                  // choices: receivedResponse
              }).save({},{method: 'insert'})
                .then(function(ballot){
                  res.status(201);
                  res.json({
                    ballot_id: ballot.get('id'),
                    election_id: ballot.get('election_id'),
                    user_id: ballot.get('user_id'),
                    choices: ballot.get('choices'),
                    created_at: ballot.get('created_at')
                  });
                  res.end();
                }).error(function(error){
                  res.status(500);
                  console.log(error);
                  res.end();
                });
            });
        });
    } else {
      res.status(400);
      res.end('Bad request');
    }
	},

  encrypt: function(req, res){
    Security.encryptString(req.body.ballot, req.body.key)
    .then(function(ciphertext){
      res.status(200).send({encryptedBallot: ciphertext});
    });
  },

  hash: function(req, res){
    Security.hashString(req.body.ballot).then(function(hash){
      res.status(200).send({hash: hash});
    });
  }

};

module.exports = ballots;
