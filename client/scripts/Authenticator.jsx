'use strict';

var React = require('react');
var UserStore = require('./stores/UserStore');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Authenticator = React.createClass({
  statics: {
    willTransitionTo: function(transition, params, query, callback){
      UserStore.checkLoggedIn()
      .then(function(loggedin){
        if (!loggedin){
          transition.redirect('/login', {}, {'next': transition.path});
          callback();
        } else {
          callback();
        }
      });
    }
  },

  render: function(){return <RouteHandler/>;}
});

module.exports = Authenticator;