'use strict';

var db = require('../../config/database');
var Poll = require('./poll');
var User = require('./user');
var Ballot = require('./ballot');
var Question = require('./question');
var Poll = require('./poll');

// Get all ballot from DB
var ballotArray, selection;
var ballotSum = {};

// Helper function: Iterate each ballot and update to ballotSum
function countBallots (ballotJsonArray){
  for(var i = 0; i < ballotJsonArray.length; i++){
    var ballot = ballotJsonArray[i];
    for(var j = 0; j < ballot["choices"]["selections"].length; j++){
      var question = ballot["choices"]["selections"][j];
      question["selection"] !==null? selection = question["selection"] : selection = "undervote";

      if(!ballotSum[question["question_id"]]){
        ballotSum[question["question_id"]] = {};
        ballotSum[question["question_id"]]["selection"] = {};
        ballotSum[question["question_id"]]["question"] = "";
      }
      // update count
      ballotSum[question["question_id"]]["selection"][selection] = ballotSum[question["question_id"]]["selection"][selection] || 0;
      ballotSum[question["question_id"]]["selection"][selection]++;
    }
  }
}

// Get question's context through the ballot summary array key
function getQuestionContext(ballotSummary, callback){
  for(var key in ballotSummary){
    updateQuestionName(key);
  }
  return callback();
}

// Create a closure funciton to retain the questionID
function updateQuestionName(questionID){
  Question.where({id: questionID}).fetch().then(function(ques){
    ques = ques.toJSON();

    // Update ballotSum with name in the input, check line 80 for final ballotSum store back to election results
    ballotSum[questionID]["question"] = ques["name"];
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
    return Ballot.where({election_id: that.get('id')}).fetchAll().then(function(ballot){
      ballotArray = ballot.toJSON();
      countBallots(ballotArray);

      return getQuestionContext(ballotSum, function(){
        return that.save({results: ballotSum});
      });
    });
  }
});

module.exports = db.model('Election', Election);

/*
One example of results save to election
{ '2':
   { selection: { Fred: 2, '': 1, undervote: 1 },
     question: 'Best eater in 2015' },
  '3':
   { selection: { Marcus: 3, Brian: 1 },
     question: 'Tallest guy in 2015' } }
*/
