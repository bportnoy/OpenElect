'use strict';

var db = require('../../config/database');
var Group = require('./group');
var Ballot = require('./ballot');
var Election = require('./election');
var Promise = require('bluebird');
var scrypt = require('scrypt');

//set up scrypt with strong work factor and set up encoding of hash and verify input/output
var scryptParams = {N:16384, r:8, p:1};
scrypt.hash.config.outputEncoding = 'hex';
scrypt.hash.config.keyEncoding = 'utf16';
scrypt.verify.config.hashEncoding = 'hex';
scrypt.verify.config.keyEncoding = 'utf16';


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  group: function(){
    return this.belongsToMany('Group');
  },

  ballot: function(){
    return this.hasMany('Ballot');
  },

  election: function(){
    return this.belongsToMany('Election');
  },

  initialize: function(){
    this.on('creating', this.hashPassword);
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

// console.log(scrypt.Hash);


// console.log('hash is');
// scrypt.hash(new Buffer('test'), scryptParams, function(err, result){
//   console.log('err ' + err);
//   console.log('result ' + result);
//   var hashed = result;
//   // new Promise()
//   console.log(scrypt.verify(hashed, new Buffer('test')));
// });
