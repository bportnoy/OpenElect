'use strict';

var Promise = require('bluebird');
var PriorityQueue = require('js-priority-queue');
var _ = require('lodash');
var cp = require('child_process');
var uuid = require('uuid');

var db = require('../config/database');

/*
Find out what we're workin' with! In a single core environment, we'll still use one thread and let the OS manage
resources. In a multicore environment, we'll leave one core for Node and use the rest for child threads.
 */
var numChildren = require('os').cpus().length;
if (numChildren > 1) numChildren--;

//this object will hold our child threads
var _children = {};

/*
For each child thread
 */
for (var i = 0; i < numChildren; i++){

  var id = uuid.v4();
  var child = cp.fork(__dirname + '/securitychild.js', {env: 
                                                            {PEPPER: process.env.PEPPER},
                                                            execArgv: []});

  child.on('error', function(error){
    console.error('Error in child process: ' + error);
  });

  //when we get the result of reach transaction, this function is called to get the next operation in the queue
  child.on('message', function(payload){
    next(id, payload);
  });

  var container = {child: child, childId: id, active: false};
  _children[id] = container;

}

//when objects are put into this queue, lower priority numbers are dequeued first
var _cryptoQueue = new PriorityQueue({comparator: function(a,b){ return a.priority - b.priority;}});

//this object is mainly for holding the resolver functions, but also keeps a record of each payload
var _inProcess = {};

module.exports = {


  /*
  This function requests a keypair for a user.
   */
  requestUserKey: function (id) {
    request({type: 'key', userid: id, priority: 4});
  },

  /**
  Utility function to encrypt a string.
  @param {string} data - The string to encrypt. If this isn't a string, we attempt to stringify.
  @param {string} publicKey - An OpenPGP-compliant public key.
  */
  encryptString: function (data, publicKey) {
    return new Promise(function(resolve, reject){
      request({type: 'encrypt',
                data: data,
                publicKey: publicKey,
                resolver: resolve,
                priority: 3});
    });
  },

  /**
   * Utility function to decrypt a string.
   * @param  {string} data The string to be decrypted.
   * @param  {string} privateKey An OpenPGP-compliant private key.
   * @return {Promise} A promise that resolves to the cleartext.
   */
  decryptString: function(data, privateKey){
    return new Promise(function(resolve, reject){
      request({type: 'decrypt',
                data: data,
                privateKey: privateKey,
                resolver: resolve,
                priority: 2});
    });
  },

  /**
   * This function returned a hex-encoded sha512 of the input.
   * @param  {[string]} The data to hash.
   * @return {[Promise]} A promise that resolves to the hex-encoded sha-512 of the input data.
   */
  hashString: function(data){
    return new Promise(function(resolve, reject){
      request({type: 'hash',
                data: data,
                resolver: resolve,
                priority: 1});
    });
  },


  //two security-related utility functions for user authentication
  checkLoggedIn: function(req){
    return req.session ? !!req.user : false;
  },

  authenticateAPI: function(req, res, next){
    if (module.exports.checkLoggedIn(req)){
      next();
    }
    else res.status(401).send('Error: not logged in.');
  }

};

/*
This function is used by the module methods to either immediately delegate work to a child thread, 
or enqueue it for later processesing.
 */
function request (payload){
  payload.id = uuid.v4();
  if (_cryptoQueue.length){ // if the queue is full, just enqueue the payload
    _cryptoQueue.queue(payload);
  } else { //otherwise, let's find this payload a home!
    var slotted = false;
    _.each(_children, function(child, key){
      if (!child.active){
        _inProcess[payload.id] = payload;
        child.active = true;
        child.child.send(payload);
        slotted = true;
        return false;
      }
    });
    if (!slotted) _cryptoQueue.queue(payload); //in case the queue was empty, but all the threads were working
  }
}

/*
This function is used by the module methods to process the result of each child thread action,
and then get the next action from the queue.
 */
function next (childId, payload) {
  //use the IDs to retrieve the payload from our storage in this thread
  var sentPayload = _inProcess[payload.id];
  if (sentPayload.type === 'key') storeKey(payload); //the user key generation doesn't wait for a response
  else {
    sentPayload.resolver(payload.result); //resolve those promises!
  }
  delete _inProcess[payload.id]; //no memory leaks please
  try{
    var nextPayload = _cryptoQueue.dequeue();
    _inProcess[nextPayload.id] = nextPayload;
    _children[childId].child.send(nextPayload);
  } catch(err){
    //empty queue throws error
    _children[childId].active = false; //if the queue is empty, this child can rest
  }
}

/*
This is used after key generation to get a user from the database and assign its new keys.
 */
function storeKey(payload){
  var User = db.model('User');
  User.forge({id: payload.userid}).fetch()
  .then(function(user){
    if (user){
      user.set({public_key: payload.result.publicKeyArmored,
                 private_key: payload.result.privateKeyArmored});
      user.save();
    }
  });
}