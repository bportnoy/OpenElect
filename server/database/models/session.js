var db = require('../config.js');

var Session = db.Model.extend({
  tableName: 'sessions',
  hasTimestamps: true
  
})

module.exports = Session;