'use strict';

var openpgp = require('openpgp');
var crypto = require('crypto');

process.on('message', function(payload) {
  if (payload === 'test'){
    process.send('test');
  }
  switch (payload.type){
    case 'key':
      generateUserKey(payload);
    break;

    case 'encrypt':
      encryptString(payload);
    break;

    case 'decrypt':
      decryptString(payload);
    break;

    case 'hash':
      hashString(payload);
    break;

    default: //no-op
  }
});

/**
This generates a public and private RSA keypair for each user, then locks that key with a sitewide pepper passphrase.
Ensure that this passphrase contains sufficient entropy to thwart an attacker in the event your database is
compromised. A potential future addition is encrypting the passphrase with an even stronger key.
@param id - the user for which a keypair will be generated.
*/
function generateUserKey (payload) {
  var options = {
      numBits: 2048,
      userId: 'OpenElect User ' + payload.userid,
      passphrase: process.env.PEPPER,
  };
  
  openpgp.generateKeyPair(options).then(function(keypair) {
    process.send({id: payload.id, result: keypair, userid: payload.userid, pepper: process.env.PEPPER});
    keypair = null;
  }).catch(function(error) {
      console.error('Error generating user keypair: ' + error);
      process.send({id: payload.id, error: true, result: error});
  });
}

function encryptString (payload) {

  var data = checkString(payload.data);
  if (data === null) process.send({id: payload.id, result: null});

  var publicKey = openpgp.key.readArmored(payload.publicKey);

  openpgp.encryptMessage(publicKey.keys, data).then(function(encryptedData) {
      process.send({id: payload.id, result: encryptedData});
    }).catch(function(error) {
        process.send({id: payload.id, error: true, result: error});
    });
}

function decryptString (payload) {

  var data = checkString(payload.data);
  if (data === null) process.send({id: payload.id, result: null});

  var privateKey = openpgp.key.readArmored(payload.privateKey).keys[0];
  privateKey.decrypt(process.env.PEPPER);
  data = openpgp.message.readArmored(data);

  openpgp.decryptMessage(privateKey, data).then(function(plaintext) {
      process.send({id: payload.id, result: plaintext});
  }).catch(function(error) {
    process.send({id: payload.id, error: true, result: error});
  });

}

function hashString (payload) {
  var data = checkString(payload.data);
  if (data === null) process.send({id: payload.id, result: null});

  var sha512 = crypto.createHash('sha512');
  sha512.update(data, 'ascii');
  process.send({id: payload.id, result: sha512.digest('hex')});
}

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