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
                  return done(null, false);
                } else {
                    if (!user.get('has_logged_in')){
                      user.set('has_logged_in', true).save();
                    }
                    return done(null, user);
                }
              });
        }
    });
  }
));


module.exports = passport;