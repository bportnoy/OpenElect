var db = require('../config.js');
var Election = require('./election.js');
var User = require('./user.js');

var Ballot = db.Model.extend({
  tableName: 'ballots',
  hasTimestamps: true,

  election: function(){
    return this.belongsTo(Election);
  },
  user: function(){
    return this.hasOne(User);
  }
})

module.exports = Ballot;