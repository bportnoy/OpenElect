var db = require('../config.js');
var User = require('./user.js');
var User_election = require('./user_election.js');
var Ballot = require('./ballot.js');
var Poll = require('./poll.js');
var Result = require('./result.js');

var Election = db.Model.extend({
  tableName: 'elections',
  hasTimestamps: true,

  user: function(){
    return this.hasMany(User);
  },
  user_election: function(){
    return this.hasOne(User_election);
  },
  ballot: function(){
    return this.hasMany(Ballot);
  },
  poll: function(){
    return this.hasMany(Poll);
  },
  result: function(){
    return this.hasOne(Result);
  }
})

module.exports = Election;