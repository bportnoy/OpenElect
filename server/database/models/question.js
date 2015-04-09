var db = require('../../config/database');
var Poll = require('./poll');

var Question = db.Model.extend({
  tableName: 'questions',
  hasTimestamps: true,

  poll: function(){
    return this.belongsTo(Poll);
  }
});

module.exports = Question;