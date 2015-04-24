'use strict';

var db = require('../../config/database');
var User = require('./user');
var Poll = require('./poll');

var Group = db.Model.extend({

  tableName: 'groups',

  hasTimestamps: true,

  hidden: ['owner_id', 'pending_adds'], //prevents these files from being included in a .toJSON() call.

  poll: function(){
    return this.hasMany('Poll');
  },

  user: function(){
    return this.belongsToMany('User');
  },

  virtuals: {
    member_count: function() {
      return this.related(['user']).length;
    }
  }

});

module.exports = db.model('Group', Group);