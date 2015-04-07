var db = require('../config.js');
var Poll = require('./poll.js');

var Question = db.Model.extend({
  tableName: 'questions',
  hasTimestamps: true,

  poll: function(){
    return this.belongsTo(Poll);
  }
})

module.exports = Question;