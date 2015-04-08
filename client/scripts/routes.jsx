'use strict';

var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var Index = require('./components/index.jsx');

var routes = (
  <Route name='index' path='/' handler={Index}>
    <DefaultRoute handler={Index} />
  </Route>
);

exports.run = function(){
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app-view'));
  });
};

//Example of React Router nested views.
// var routes = (
//   <Route name="index" path="/" handler={Index}>
//     <Route name="inbox" handler={Inbox}/>
//     <Route name="calendar" handler={Calendar}/>
//     <DefaultRoute handler={Dashboard}/>
//   </Route>
// );