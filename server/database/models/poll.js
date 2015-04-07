var db = require('../config.js');
var Question = require('./question.js');
var Election = require('./election.js');
var Group = require('./group.js');

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
})

module.exports = Poll;