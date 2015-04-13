'use strict';

var db = require('../../config/database');

var Session = db.Model.extend({
  tableName: 'sessions',
  hasTimestamps: true
  
});

module.exports = db.model('Session', Session);