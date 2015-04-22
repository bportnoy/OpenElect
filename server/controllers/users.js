'use strict';

var Promise = require('bluebird');
var _ = require('lodash');
var User = require('../database/models/user');
var Group = require('../database/models/group');
var generator = require('generate-password');
var mailer = require('./mailer');
var uuid = require('uuid');

module.exports = {

  /*
  This function adds a user to a group, sending them an invitation if the user isn't in our database.
  The callback is sometimes used in an asynchronous iterator, if present it will be called to let the iterator know we're done.
   */
  addToGroup: function(userDetails, groupId, callback){
    return Group.forge({id: groupId}).fetch()
    .then(function(group){
      var groupName = group.get('name');//for the email!
      return User.forge({email: userDetails.EmailAddress}).fetch()
      .then(function(user){
        if (user){
          user.groups().attach(groupId); //if the user exists, add them to the group
          callback && callback();//thanks iterator!
          return true;
        }
        else {
          var tempPassword = generator.generate({numbers: true});
          var newUser = {
            first_name: userDetails.FirstName,
            last_name: userDetails.LastName,
            email: userDetails.EmailAddress,
            id: uuid.v4(),
            password: tempPassword,
            must_change_pass: true
          };
          return User.forge(newUser).save({}, {method: 'insert'}).then(function(user){
            user.groups().attach(groupId);
            return user.save().then(function(user){
              mailer.sendInvitation(userDetails.EmailAddress, userDetails.FirstName,
                                   userDetails.LastName, groupName, tempPassword);
              callback && callback();//thanks iterator!
              return true;
            });//save user
          });//forge user
        }
      });//fetch by email
    });//group
  },

  removeFromGroup: function(userId, groupId){
    return Group.forge({id: groupId}).fetch({withRelated: ['user']})
    .then(function(group){
      return group.user().detach(userId)
      .then(function(group){
        return true;
      }).catch(function(err){console.log(err);});
    });
  }

};