var db = require('../config');
var User = require('./user');
var Group = require('./group');

var User_group = db.Model.extend({
  tableName: 'usersusers_groups',
  hasTimestamps: true,

  user: function(){
    return this.belongsTo(User);
  },
  group: function(){
    return this.belongsTo(Group);
  }
});

module.exports = User_group;