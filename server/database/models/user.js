'use strict';

var db = require('../../config/database');
var Group = require('./group');
var Ballot = require('./ballot');
var Election = require('./election');
var Promise = require('bluebird');
var scrypt = require('scrypt');
var Security = require('../../controllers/security');

//set up scrypt with strong work factor and set up encoding of hash and verify input/output
var scryptParams = {N:16384, r:8, p:1};
scrypt.hash.config.outputEncoding = 'hex';
scrypt.hash.config.keyEncoding = 'utf16';
scrypt.verify.config.hashEncoding = 'hex';
scrypt.verify.config.keyEncoding = 'utf16';


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

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

  hashPassword: function(){
    var self = this;
    var userPassword = this.get('password');
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

  generateKeys: function () {
    Security.requestUserKey(this.get('id'));
  },

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