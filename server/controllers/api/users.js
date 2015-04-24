/**
 * User Endpoint Controller
 */

'use strict';

var User = require('../../database/models/user');
var uuid = require('uuid');

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
  }
};

module.exports = Users;