var db = require('../config.js');
var User = require('./user.js');
var Election = require('./election.js');

var User_election = db.Model.extend({
  tableName: 'users_elections',
  hasTimestamps: true,

  user: function(){
    return this.belongsTo(User);
  },
  election: function(){
    return this.belongsTo(Election);
  }
})

module.exports = User_election;