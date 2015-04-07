var db = require('../config');
var Election = require('./election');

var Result = db.Model.extend({
  tableName: 'results',
  hasTimestamps: true,

  election: function(){
    return this.belongsTo(Election);
  }
});

module.exports = Result;