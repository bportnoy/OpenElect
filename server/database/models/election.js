'use strict';

var db = require('../../config/database');
var Poll = require('./poll');
var User = require('./user');
var Ballot = require('./ballot');

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
      }
      // update count
      ballotSum[question["question_id"]][selection] = ballotSum[question["question_id"]][selection] || 0;
      ballotSum[question["question_id"]][selection]++;
    }
  }
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
      // console.log('Ballot summary: ', ballotSum);

      // save reulst back to elections table
      return that.save({results: ballotSum});
    });
  }
});

module.exports = db.model('Election', Election);