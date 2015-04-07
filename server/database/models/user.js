var db = require('../config.js');
var User_group = require('./user_group.js');
var User_election = require('./user_election.js');
var Group = require('./group.js');
var Ballot = require('./ballot.js');
var Election = require('./election.js');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  user_group: function(){
    return this.hasOne(User_group);
  },
  user_election: function(){
    return this.hasOne(User_election);
  },
  group: function(){
    return this.belongsToMany(Group);
  },
  ballot: function(){
    return this.hasMany(Ballot);
  },
  election: function(){
    return this.belongsToMany(Election);
  }
})

module.exports = User;