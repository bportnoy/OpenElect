'use strict';

var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var Index = require('./components/index.jsx');
var App = require('./components/layouts/app.jsx');
var Vote = require('./components/modules/vote/VotingBooth.jsx');
var Submitting = require('./components/modules/vote/Submitting.jsx');
var Submitted = require('./components/modules/vote/Submitted.jsx');

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='vote' path='/vote/:electionId' handler={Vote}/>
    <Route name='submitting' handler={Submitting} />
    <Route name='submitted' handler={Submitted} />
    <DefaultRoute name='index' handler={Index}/>
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