'use strict';

var db = require('../../config/database');
var Group = require('./group');
var Ballot = require('./ballot');
var Election = require('./election');
var Promise = require('bluebird');
var scrypt = require('scrypt');
var uuid = require('uuid');
var Security = require('../../controllers/security');
var Mailer = require('../../controllers/mailer');
var Moment = require('moment');

//set up scrypt with strong work factor and set up encoding of hash and verify input/output
var scryptParams = {N:16384, r:8, p:1};
scrypt.hash.config.outputEncoding = 'hex';
scrypt.hash.config.keyEncoding = 'utf16';
scrypt.verify.config.hashEncoding = 'hex';
scrypt.verify.config.keyEncoding = 'utf16';


var User = db.Model.extend({
  tableName: 'users',

  hasTimestamps: true,

  hidden: ['password',
           'public_key', 
           'private_key', 
           'key_status',
           'admin_level'], //prevents these files from being included in a .toJSON() call.

  groups: function(){
    return this.belongsToMany('Group');
  },

  ballots: function(){
    return this.hasMany('Ballot');
  },

  elections: function(){
    return this.belongsToMany('Election');
  },

  initialize: function(){
    this.on('creating', this.hashPassword);
    this.on('created', this.generateKeys);
  },

  hashPassword: function(model, attrs, options, newPassword){
    var self = this;
    var userPassword = newPassword || this.get('password');
    return new Promise (function(resolve, reject){
      scrypt.hash(new Buffer(userPassword), scryptParams, function(err, result){
        if (err !== null) {
          console.error('Error hashing password: ' + err);
          reject(err);
        }
        else {
          self.set('password', result);
          resolve(result);
        }
      });
    });
  },

  startPasswordReset: function(){
    var resetCode = uuid.v4();
    this.set({reset_code: resetCode, reset_requested: Moment()});
    this.save().then(function(user){
      Mailer.resetPassword(user, resetCode);
    });
  },

  generateKeys: function (model) {
    setTimeout(function(){
      Security.requestUserKey(this.get('id'));
    }.bind(model), 100); //generate the keys after the new user response is sent
  },

  /*
  Returns a promise that resolves to true if the attempted password matches the user password, or false otherwise.
   */
  verifyPassword: function(attemptedPassword){
    return new Promise(function(resolve,reject){
      scrypt.verify(this.get('password'), new Buffer(attemptedPassword), function(err, result){
        if (err && err.scrypt_err_message !== 'password is incorrect'){
          reject(err);
        } else resolve(result);
      });
    }.bind(this));
  }

});

module.exports = db.model('User', User);