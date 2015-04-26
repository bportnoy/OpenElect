'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Header = require('../modules/Header.jsx');
var Footer = require('../modules/Footer.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Header/>
          	<RouteHandler/>
        <Footer/>
      </div>
    );
  },
});

module.exports = App;
