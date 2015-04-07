var db = require('../config.js');
var User_group = require('./user_group.js');
var User = require('./user.js');
var Poll = require('./poll.js');

var Group = db.Model.extend({
  tableName: 'groups',
  hasTimestamps: true,

  user_group: function(){
    return this.hasOne(User_group);
  },
  poll: function(){
    return this.hasMany(Poll);
  },
  user: function(){
    return this.hasMany(User);
  }
})

module.exports = Group;