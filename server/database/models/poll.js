var db = require('../../config/database');
var Question = require('./question');
var Election = require('./election');
var Group = require('./group');

var Poll = db.Model.extend({
  tableName: 'polls',
  hasTimestamps: true,

  question: function(){
    return this.hasMany(Question);
  },
  election: function(){
    return this.belongsTo(Election);
  },
  group: function(){
    return this.hasOne(Group);
  }
});

module.exports = Poll;