/**
 * API Routes
 */

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var _ = require('lodash');
var passport = require('../config/passport');

// controllers live here
var api = require('../controllers/api');
var authenticate = require('../controllers/security').authenticateAPI;

// create our router for the API
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(multer({dest: __dirname + '/../uploads/tmp/',
                    limits: {
                      files: 1,
                      fileSize: 50000000 //who needs more than 50mb of voter rolls?
                    }}));

var routes = function(app) {

  /**
   *  routes for user authentication
   *  ===================================
   */

  //signup
  router.route('/users/signup')
    .post(function(req, res){
      api.users.create(req, res);
    });

  //login
  router.route('/users/login')
    .post(passport.authenticate('local'), function(req, res){
      res.status(200).send('index');
    });

  //logout
  router.route('/users/logout')
    .get(function(req, res){
      req.session.destroy();
      res.redirect('/');
    });

  //check if user is logged in
  router.route('/users/checkLoggedIn')
    .get(authenticate, function(req, res){
      res.status(200).send({loggedin: true,
                               id: req.user.id,
                               first_name: req.user.first_name,
                               last_name: req.user.last_name,
                               email: req.user.email});
    });

  //change password
  router.route('/users/changePassword')
    .put(authenticate, function(req, res){
      api.users.changePassword(req, res);
    });

  //reset password
  router.route('/users/:email/resetPassword')
    .get(function(req, res){
      api.users.startPasswordReset(req, res);
    })
    .put(function(req, res){
      api.users.resetPassword(req, res);
    });

  /**
   *  routes for elections
   *  ===================================
   */

  // list elections
  router.route('/elections')
    .get(authenticate, function(req, res){
      api.elections.list(req,res);
    });


  // list elections by owner
  router.route('/elections/owner/:id')
    .get(authenticate, function(req, res) {
      api.elections.ownerList(req.params.id, req, res);
    });

  // create an election
  router.route('/elections/create')
    .post(authenticate, function(req, res) {
      api.elections.create(req, res);
    });

  // retrieve or update a specific election by id
  router.route('/elections/update/:id')
    .get(authenticate, function(req, res) {
      api.elections.adminGetById(req.params.id, req, res);
    })
    .post(authenticate, function(req, res) {
      api.elections.updateById(req.params.id, req, res);
    });

  // get an election object to begin voting process (voter user only)
  router.route('/elections/vote/:id')
    .get(authenticate, function(req, res) {
      api.elections.voterGetById(req.params.id, req, res);
    });

  // begin vote tabulation or view results
  router.route('/elections/results/:id')
    .get(authenticate, function(req, res) {
      api.elections.getResultsById(req.params.id, req, res);
    })
    .post(authenticate, function(req, res) {
      api.elections.tabulate(req.params.id, req, res);
    });


  /**
   *  routes for polls
   *  ===================================
   */

  // create a poll
  router.route('/polls/create')
    .post(authenticate, function(req, res) {
      api.polls.create(req, res);
    });

  // retrieve all polls that belong to an election
  router.route('/polls/election/:id')
    .get(function(req, res) {
      api.polls.getByElectionId(req.params.id, req, res);
    });

  // retrieve or update a specific poll by poll id
  router.route('/polls/update/:id')
    .get(authenticate, function(req, res) {
      api.polls.adminGetById(req.params.id, req, res);
    })
    .post(authenticate, function(req, res) {
      api.polls.updateById(req.params.id, req, res);
    });


  /**
   *  routes for questions
   *  ===================================
   */

  // create a question
  router.route('/questions/create')
    .post(authenticate, function(req, res) {
      api.questions.create(req, res);
    });

  // retrieve or update a specific question by question id
  router.route('/questions/update/:id')
    .get(authenticate, function(req, res) {
      api.questions.adminGetById(req.params.id, req, res);
    })
    .post(authenticate, function(req, res) {
      api.questions.updateById(req.params.id, req, res);
    });


  /**
   *  routes for ballots
   *  ===================================
   */

  // create a ballot (user submits vote)
  router.route('/ballots/create')
    .post(function(req, res) {
      api.ballots.create(req,res);
    });

  // if the user browser doesn't suppoer crypto.getRandomValue(), we can't encrypt locally, so we use this instead.
  router.route('/ballots/encrypt')
    .post(function(req, res) {
      api.ballots.encrypt(req, res);
    });

  /**
   *  routes for groups
   *  ===================================
   */

  // create a group
  router.route('/groups/create')
    .post(authenticate, function(req, res) {
      api.groups.create(req, res);
  });

  // upload a csv for preview
  router.route('/groups/csv')
    .post(authenticate, function(req, res) {
      api.groups.csv(req, res);
  });

  // approve & process previous CSV
  router.route('/groups/csv/process')
    .post(authenticate, function(req, res) {
      api.groups.addFromCSV(req, res);
  });

  //see if a group has finished processing its csv
  router.route('/groups/csv/check/:id')
    .get(authenticate, function(req, res) {
      api.groups.checkCSVInProcess(req.params.id, req, res);
    });

  //list groups for a user
  router.route('/groups/list')
    .get(authenticate, function(req, res) {
      api.groups.list(req, res);
    });

  //list all users for a group (must be owned)
  router.route('/groups/:id/users')
    .get(authenticate, function(req, res) {
      api.groups.listUsers(req, res);
    });

  //update existing group
  router.route('/groups/update')
    .post(authenticate, function(req, res) {
      api.groups.update(req, res);
    });

  //remove a user from a group
  router.route('/groups/users/remove')
    .post(authenticate, function(req, res){
      api.groups.removeUser(req, res);
    });

  //add smaller batch of users hand-entered by user
  router.route('/groups/users/add')
    .post(authenticate, function(req, res){
      api.groups.addUsers(req, res);
    });


  // API Root - lists the endpoints available
  router.get('/', function(req, res){
    res.json({ message: 'welcome to the api, enjoy your stay.' });
  });

  app.use('/api/v1', router);
};

module.exports = routes;
