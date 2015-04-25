'use strict';

var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var Authenticator = require('./Authenticator.jsx');
var Public = require('./Public.jsx');

var Index = require('./components/layouts/landing.jsx');
var App = require('./components/layouts/app.jsx');
var Vote = require('./components/modules/vote/VotingBooth.jsx');
var Submitting = require('./components/modules/vote/Submitting.jsx');
var Submitted = require('./components/modules/vote/Submitted.jsx');
var Dashboard = require('./components/dashboard.jsx');
var Election = require('./components/modules/admin/ElectionAdmin.jsx');
var PollCreate = require('./components/modules/admin/PollForm.jsx');
var PollAdmin = require('./components/modules/admin/poll/PollAdmin.jsx');
var Signup = require('./components/modules/Signup.jsx');
var Login = require('./components/modules/Login.jsx');
var Result = require('./components/modules/Results.jsx');
var GroupCreate = require('./components/modules/admin/CreateGroup.jsx');
var GroupAdmin = require('./components/modules/admin/GroupAdmin.jsx');
var ChangePassword = require('./components/modules/ChangePassword.jsx');
var ResetPassword = require('./components/modules/ResetPassword.jsx');
var ForgotPassword = require('./components/modules/ForgotPassword.jsx');

var UserStore = require('./stores/UserStore');

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route handler={Public}>
      <Route name='signup' path='/signup' handler={Signup} />
      <Route name='login' path='/login' handler={Login} />
      <Route name='resetPassword' path='/dashboard/user/reset/:token' handler={ResetPassword} />
      <Route name='forgotPassword' path='/dashboard/user/forgot' handler={ForgotPassword} />
      <DefaultRoute name='index' handler={Index}/>
    </Route>
    <Route handler={Authenticator}>
        <Route name='vote' path='/vote/:electionId' handler={Vote}/>
        <Route name='submitting' path='/submitting' handler={Submitting} />
        <Route name='submitted' path='/submitted' handler={Submitted} />
        <Route name='electionResults' path='/elections/:electionId' handler={Result} />
        <Route name='dashboard' path='/dashboard' handler={Dashboard} />
        <Route name='electionAdmin' path='/dashboard/election/view/:id' handler={Election} />
        <Route name='pollCreate' path='/dashboard/poll/create/:electionId' handler={PollCreate} />
        <Route name='pollAdmin' path='/dashboard/poll/:id' handler={PollAdmin} /> //is this in use?
        <Route name='groupCreate' path='/dashboard/group/create' handler={GroupCreate} />
        <Route name='groupAdmin' path='/dashboard/group/:id' handler={GroupAdmin} />
        <Route name='changePassword' path='/dashboard/user/changePassword' handler={ChangePassword} />
    </Route>
  </Route>
);

module.exports = Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app-view'));
  });