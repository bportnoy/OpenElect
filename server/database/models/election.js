var db = require('../config');
var User = require('./user');
var Ballot = require('./ballot');
var Poll = require('./poll');

var Election = db.Model.extend({
  tableName: 'elections',
  hasTimestamps: true,

  user: function(){
    return this.hasMany(User);
  },
  ballot: function(){
    return this.hasMany(Ballot);
  },
  poll: function(){
    return this.hasMany(Poll);
  }
});

module.exports = Election;