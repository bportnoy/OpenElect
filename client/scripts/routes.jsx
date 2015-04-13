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
var Election = require('./components/modules/admin/ElectionAdmin.jsx');
var ElectionCreate = require('./components/modules/admin/ElectionForm.jsx');
var PollCreate = require('./components/modules/admin/PollForm.jsx');

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='vote' path='/vote/:electionId' handler={Vote}/>
    <Route name='submitting' path='/submitting' handler={Submitting} />
    <Route name='submitted' path='/submitted' handler={Submitted} />
    <Route name='electionCreate' path='/dashboard/election/create' handler={ElectionCreate} />
    <Route name='electionAdmin' path='/dashboard/election/view/:id' handler={Election} />
    <Route name='pollCreate' path='/dashboard/poll/create/:electionId' handler={PollCreate} />
    <DefaultRoute name='index' handler={Index}/>
  </Route>
);

exports.run = function(){
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app-view'));
  });
};