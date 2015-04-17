'use strict';

var passport = require('passport');
var User = require('../database/models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.get('id'));
});

passport.deserializeUser(function(id, done) {
  User.forge()
  .where({id: id})
  .fetch()
  .then(function(user){
    done(null,user.toJSON());
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  }, function(email, password, done) {
    User.forge()
    .where({email: email})
    .fetch()
    .then(function(user){
      if (!user){
          return done(null, false);
        } else {
          user.verifyPassword(password)
              .then(function(result){
                if (!result){
                  console.log('incorrect pass');
                  return done(null, false);
                } else {
                    return done(null, user);
                }
              });
        }
    });
  }
));


module.exports = passport;