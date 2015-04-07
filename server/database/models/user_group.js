var db = require('../config.js');
var User = require('./user.js');
var Group = require('./group.js');

var User_group = db.Model.extend({
  tableName: 'usersusers_groups',
  hasTimestamps: true,

  user: function(){
    return this.belongsTo(User);
  },
  group: function(){
    return this.belongsTo(Group);
  }
})

module.exports = User_group;