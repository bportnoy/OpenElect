var db = require('../config');
var Election = require('./election');
var User = require('./user');

var Ballot = db.Model.extend({
  tableName: 'ballots',
  hasTimestamps: true,

  election: function(){
    return this.belongsTo(Election);
  },
  user: function(){
    return this.hasOne(User);
  }
});

module.exports = Ballot;