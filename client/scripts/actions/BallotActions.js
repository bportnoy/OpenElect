'use strict';

var Dispatcher = require('../dispatchers/default');
var BallotConstants = require('../constants/Constants');
var BallotStore = require('../stores/BallotStore');
var EventEmitter = require('events').EventEmitter;
var promise = require('bluebird');
var request = require('superagent');

var jssha = require('jssha');
var openpgp = require('openpgp');

var minTimeElapsed = false;

/*
Modern browsers support window.crypto.getRandomValues, which allows us to encrypt the ballot locally.
You'll be shocked to learn that Internet Explorer doesn't support this until version 11! So we have to encrypt remotely
in some cases. Moral of the story: if you care about security, update your software!
 */
function encrypt (ballot, publicKey){
  return new promise(function(resolve, reject){
    if (!!window.crypto.getRandomValues){
      publicKey = openpgp.key.readArmored(publicKey);
      openpgp.encryptMessage(publicKey.keys, ballot).then(function(encryptedData) {
        resolve(encryptedData);
      }).catch(function(error) {
        console.error(error);
        reject(error);
      });
    } else {
      request.post('/api/v1/ballots/encrypt')
      .send({ballot: ballot, key: publicKey})
      .end(function(error, response){
        resolve(response.data.encryptedBallot);
        if (error){
          reject(error);
        }
      });
    }
  });
}

var BallotActions = {

  select: function (questionId, selectionId){
    Dispatcher.dispatch({
      actionType: BallotConstants.OPTION_SELECT,
      id: questionId,
      selection: selectionId
    });
  },

  deselect: function(questionId, selectionId){
    Dispatcher.dispatch({
      actionType: BallotConstants.OPTION_DESELECT,
      id: questionId,
      selection: selectionId
    });
  },

  addQuestion: function(id){ //TODO: add max selections
    Dispatcher.dispatch({
      actionType: BallotConstants.QUESTION_ADD,
      id: id
    });
  },

  setUserAndElection: function(userId, electionId){
    Dispatcher.dispatch({
      actionType: BallotConstants.SET_USER_ELECTION,
      userId: userId,
      electionId: electionId
    });
  },

  saveElectionData: function(electionObject) {
    Dispatcher.dispatch({
      actionType: BallotConstants.SAVE_ELECTION,
      election: electionObject
    });
  },

  submitBallot: function(router){
    
    setTimeout(function(){ //make sure the user stays on the "encrypting your ballot page" for at least 2 secs
      minTimeElapsed = true;
    }, 2000);

    var ballot = JSON.stringify(BallotStore.getBallot());
    var election = BallotStore.getElection();
    var sha = new jssha(ballot, 'TEXT');
    var receipt =  sha.getHash('SHA-512', 'HEX');

    encrypt(ballot, election.public_key).then(function(encryptedBallot){
      request.post('/api/v1/ballots/create')
      .send({encryptedBallot: encryptedBallot, election_id: election.id})
      .end(function(err, response){
        if (response.status === 403){
          alert('Ballot rejected: you have already voted in this election.');
        }
        if (minTimeElapsed){
          Dispatcher.dispatch({
            actionType: BallotConstants.BALLOT_ACCEPTED,
            receipt: receipt,
            created_at: response.data.created_at,
            router: router
          });
        } else{
          setTimeout(function(){
            console.log(response);
            Dispatcher.dispatch({
              actionType: BallotConstants.BALLOT_ACCEPTED,
              receipt: receipt,
              created_at: response.body.created_at,
              router: router
            });
          }, 2000);
        }
      });
    });

  }

};

module.exports = BallotActions;