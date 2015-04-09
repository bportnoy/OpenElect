var db = require('../../config/database');

var Session = db.Model.extend({
  tableName: 'sessions',
  hasTimestamps: true
  
});

module.exports = Session;