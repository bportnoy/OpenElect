var db = require('../../config/database');
var Group = require('./group');
var Ballot = require('./ballot');
var Election = require('./election');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  group: function(){
    return this.belongsToMany(Group);
  },
  ballot: function(){
    return this.hasMany(Ballot);
  },
  election: function(){
    return this.belongsToMany(Election);
  }
});

module.exports = User;