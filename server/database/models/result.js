var db = require('../config.js');
var Election = require('./election.js');

var Result = db.Model.extend({
  tableName: 'results',
  hasTimestamps: true,

  election: function(){
    return this.belongsTo(Election);
  }
})

module.exports = Result;