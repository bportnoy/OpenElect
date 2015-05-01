'use strict';

var db = require('../../config/database');
var Poll = require('./poll');
var User = require('./user');
var Ballot = require('./ballot');
var Question = require('./question');
var Poll = require('./poll');
var Security = require('../../controllers/security');
var async = require('async');
var Promise = require('bluebird');

var ballotSum = {};

// Helper function: Iterate each ballot and update to ballotSum
function countBallots (ballots, election){
  var User = db.model('User');
  return new Promise(function(resolve, reject){
    User.forge({id: election.get('owner_id')}).fetch()
    .then(function(user){
      async.each(ballots, function(ballot, ballotCallback){
        Security.decryptString(ballot.encrypted, user.get('private_key'))
        .then(function(decryptedBallot){
          decryptedBallot = JSON.parse(decryptedBallot);
          async.each(decryptedBallot.selections, function(question, questionCallback){
            question.selection = question.selection !== null ? question.selection : 'undervote';
            if (!ballotSum[question.question_id]){
              ballotSum[question.question_id] = {};
              ballotSum[question.question_id].selection = {};
              ballotSum[question.question_id].question = '';
            }
            if (!ballotSum[question.question_id].selection[question.selection]){ // if this selection hasn't received votes, set to 0
              ballotSum[question.question_id].selection[question.selection] = 0;
            }
            ballotSum[question.question_id].selection[question.selection]++;
            questionCallback();
          }, function(err){//called when all questions have been async iterated
            if (err) ballotCallback(err);
            else ballotCallback();
          });//question each
        });//decrypt
      },function(err){//called when all ballots have been async iterated
        if (err) reject(false);
        else resolve(true);
      });//ballots each
    });//user
  });//promise
}

// Get question's context through the ballot summary array key
function getQuestionContext(ballotSummary, callback){
  // async.each(ballotSummary, function())
  for(var key in ballotSummary){
    updateQuestionName(key);
  }
  return callback();
}

// Create a closure funciton to retain the questionID
function updateQuestionName(questionID){
  return Question.forge({id: questionID}).fetch().then(function(ques){
    ques = ques.toJSON();
    // Update ballotSum with name in the input, check line 80 for final ballotSum store back to election results
    ballotSum[questionID].question = ques.name;
    ballotSum[questionID].options = ques.options;
  });
}

var Election = db.Model.extend({
  tableName: 'elections',
  hasTimestamps: true,

  user: function(){
    return this.hasMany('User');
  },

  ballot: function(){
    return this.hasMany('Ballot');
  },

  poll: function(){
    return this.hasMany('Poll');
  },

  tabulate: function() {
    var that = this;
    if (this.get('results') === null){
      return Ballot.where({election_id: that.get('id')}).fetchAll()
      .then(function(ballots){
        return countBallots(ballots.toJSON(), that).then(function(success){
          if (success){
            return getQuestionContext(ballotSum, function(){
              return that.save({results: ballotSum});
            });
          } else return('Error during tabulation.');
        });
      });
    } else return this.save();
  }
});

module.exports = db.model('Election', Election);
