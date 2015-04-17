'use strict';

// var CryptoJS = require('crypto-js'); //may need to NPM uninstall
var Promise = require('bluebird');
var Queue = require('data-structures').Queue;
var _ = require('underscore');
var openpgp = require('openpgp');
var crypto = require('crypto');


//Find out what we're workin' with! These functions are async but we want to shovel
//crypto to other cores if we have them.
var cores = require('os').cpus().length;

var db = require('../config/database');

var cryptoQueue = new Queue;

var fs = require('fs');

module.exports = {

  /**
  @function
  This function puts the user into a queue of users that needs keys generated, or, if the queue is empty, generates a key
  @param id - The user id to enqueue.
  */
  requestUserKey: function(id) {
    if (cryptoQueue.size){
      cryptoQueue.enqueue(id);
    } else this.generateUserKey(id);
  },

  /**
  This generates a public and private RSA keypair for each user, then locks that key with a sitewide pepper passphrase.
  Ensure that this passphrase contains sufficient entropy to thwart an attacker in the event your database is
  compromised. A potential future addition is encrypting the passphrase with an even stronger key.
  @param id - the user for which a keypair will be generated.
  */
  generateUserKey: function(id) {
    var User = db.model('User');
    var self = this;
    var options = {
        numBits: 2048,
        userId: 'OpenElect User ' + id,
        passphrase: process.env.PEPPER,
    };
    
    openpgp.generateKeyPair(options).then(function(keypair) {
      User.forge({id: id}).fetch().then(function(user){
        user.set('private_key', keypair.privateKeyArmored);
        user.set('public_key', keypair.publicKeyArmored);
        user.save();
        keypair.privateKeyArmored = null;
        keypair.publicKeyArmored = null;
      });
    }).catch(function(error) {
        console.error('Error generating user keypair: ' + error);
    });
  },

  /**
  Utility function to encrypt a string.
  @param {string} data - The string to encrypt. If this isn't a string, we attempt to stringify.
  @param {string} publicKey - An OpenPGP-compliant public key.
  */
  encryptString: function (data, publicKey) {
    data = checkString(data);
    if (data === null) return null;

    publicKey = openpgp.key.readArmored(publicKey);

    return openpgp.encryptMessage(publicKey.keys, data).then(function(encryptedData) {
        return encryptedData;
      }).catch(function(error) {
          console.error(error);
      });
  },

  /**
   * Utility function to decrypt a string.
   * @param  {string} data The string to be decrypted.
   * @param  {string} privateKey An OpenPGP-compliant private key.
   * @return {Promise} A promise that resolves to the cleartext.
   */
  
  decryptString: function(data, privateKey){
    data = checkString(data);
    if (data === null) return null;

    privateKey = openpgp.key.readArmored(privateKey).keys[0];
    privateKey.decrypt(process.env.PEPPER);
    data = openpgp.message.readArmored(data);

    return openpgp.decryptMessage(privateKey, data).then(function(plaintext) {
        return plaintext;
    }).catch(function(error) {
        console.error(error);
    });

  },

  /**
   * This function returned a hex-encoded sha512 of the input.
   * @param  {[string]} The data to hash.
   * @return {[string]} The hex-encoded sha-512 of the input data.
   */
  hashString: function(data){
    data = checkString(data);
    if (data === null) return null;

    var sha512 = crypto.createHash('sha512');
    sha512.update(data, 'ascii');
    return sha512.digest('hex');
  }

    

};

/**
 * This utility function makes sure that we have a string for our crypto ops; if not, it tries to stringify.
 * @param  {string} string The string to check.
 * @return {[string]} Thing stringified string, or null if the data is unstringifiable.
 */
function checkString (string){
  if (!typeof string === 'string'){
    try {
        string = JSON.stringify(string);
      } catch (err) {
        console.error('Error encrypting data - data not stringifiable: ' + err);
        return null;
      }
    }
  return string;
}