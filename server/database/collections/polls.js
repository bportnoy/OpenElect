'use strict';

var db = require('../../config/database');

var Polls = db.Collection.extend({
  model: db.model('Poll')
});


module.exports = Polls;