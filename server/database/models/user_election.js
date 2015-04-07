var db = require('../config');
var User = require('./user');
var Election = require('./election');

var User_election = db.Model.extend({
  tableName: 'users_elections',
  hasTimestamps: true,

  user: function(){
    return this.belongsTo(User);
  },
  election: function(){
    return this.belongsTo(Election);
  }
});

module.exports = User_election;