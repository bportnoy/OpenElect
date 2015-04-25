/**
 * User Endpoint Controller
 */

'use strict';

var User = require('../../database/models/user');
var uuid = require('uuid');
var Moment = require('moment');

var Users = {
  create: function(req, res) {
    var userData = req.body.user;
    var newUser = User.forge({
      id: uuid.v4(),
      email: userData.email,
      password: userData.password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      admin_level: 0
    });

    User.forge({email: userData.email})
        .fetch()
        .then(function(possibleExistingUser){
          if (possibleExistingUser) res.status(409).send('User with that e-mail already exists.'); //e-mail must be unique
          console.log('pre new user');
          newUser.save({},{method: 'insert'})
                  .then(function(user){
                    console.log('response');
                    res.status(201).send('User created.'); // return the new user's attributes
                  });
        });
  },

  changePassword: function(req, res){
    User.forge({id: req.user.id}).fetch()
    .then(function(user){
      user.verifyPassword(req.body.old)
      .then(function(match){
        if (match){
          user.hashPassword(undefined, undefined, undefined, req.body.new)
          .then(function(result){
            user.save().then(function(user){
              res.status(200).send('Password changed successfully.');
            });//save
          });//hash
        } else {
          res.status(401).send('Old password incorrect');
        }
      });//verify
    });//forge
  },

  startPasswordReset: function(req, res){
    User.forge({email: req.params.email}).fetch()
    .then(function(user){
      if (!user) res.status(404).send('User doesn\'t exist.');
      else {
        user.startPasswordReset();
        res.status(200).send('Check your e-mail.');
      }
    });
  },

  resetPassword: function(req, res){
    User.forge({reset_code: req.body.reset_code}).fetch()
    .then(function(user){
      if (!user) res.status(401).send('Error: reset token not found.');
      else{
        var resetRequestDate = user.get('reset_requested');
        if (resetRequestDate !== null && Moment(resetRequestDate).add(86400000, 'ms').isBefore(Date.now())){ //expires after 24 hours
          res.status(401).send('Link expired');
        } else{
          user.hashPassword(undefined, undefined, undefined, req.body.new)
          .then(function(result){
            user.save().then(function(user){
              res.status(200).send('Password changed successfully.');
              user.set({reset_requested: null, reset_code: null}).save();
            });//save
          });//hash
        }
      }
    });//fetch
  }
};

module.exports = Users;