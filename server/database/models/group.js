'use strict';

var db = require('../../config/database');
var User = require('./user');
var Poll = require('./poll');

var Group = db.Model.extend({

  tableName: 'groups',

  hasTimestamps: true,

  poll: function(){
    return this.hasMany('Poll');
  },

  user: function(){
    return this.hasMany('User');
  }

});

module.exports = db.model('Group', Group);