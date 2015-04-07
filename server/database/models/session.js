var db = require('../config');

var Session = db.Model.extend({
  tableName: 'sessions',
  hasTimestamps: true
  
});

module.exports = Session;