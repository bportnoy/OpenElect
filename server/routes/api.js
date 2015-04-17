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

  //login
  router.route('/users/signup')
    .post(function(req, res){
      api.users.create(req,res);
    });

  router.route('/users/login')
    .post(passport.authenticate('local'), function(req, res){
      res.status(200).send('index');
    });

  /**
   *  routes for elections
   *  ===================================
   */

  // list elections
  router.route('/elections')
    .get(function(req, res){
      api.elections.list(req,res);
    });


  // list elections by owner
  router.route('/elections/owner/:id')
    .get(function(req, res) {
      api.elections.ownerList(req.params.id, req, res);
    });

  // create an election
  router.route('/elections/create')
    .post(function(req, res) {
      api.elections.create(req, res);
    });

  // retrieve or update a specific election by id
  router.route('/elections/update/:id')
    .get(function(req, res) {
      api.elections.adminGetById(req.params.id, req, res);
    })
    .post(function(req, res) {
      api.elections.updateById(req.params.id, req, res);
    });

  // get an election object to begin voting process (voter user only)
  router.route('/elections/vote/:id')
    .get(function(req, res) {
      api.elections.voterGetById(req.params.id, req, res);
    });

  // begin vote tabulation or view results
  router.route('/elections/results/:id')
    .get(function(req, res) {
      api.elections.getResultsById(req.params.id, req, res);
    })
    .post(function(req, res) {
      api.elections.tabulate(req.params.id, req, res);
    });


  /**
   *  routes for polls
   *  ===================================
   */

  // create a poll
  router.route('/polls/create')
    .post(function(req, res) {
      api.polls.create(req, res);
    });

  // retrieve or update a specific poll by id
  router.route('/polls/update/:id')
    .get(function(req, res) {
      api.polls.adminGetById(req.params.id, req, res);
    })
    .post(function(req, res) {
      api.polls.updateById(req.params.id, req, res);
    });


  /**
   *  routes for questions
   *  ===================================
   */

  // create a poll - post only
  router.route('/questions/create')
    .post(function(req, res) {
      api.questions.create(req, res);
    });

  // retrieve or update a specific poll by id
  router.route('/questions/update/:id')
    .get(function(req, res) {
      api.questions.adminGetById(req.params.id, req, res);
    })
    .post(function(req, res) {
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

  /**
   *  routes for groups
   *  ===================================
   */

  // create a group
  router.route('/groups/create')
    .post(function(req, res) {
      api.groups.create(req, res);
  });

  // upload a csv for preview
  router.route('/groups/csv')
    .post(function(req, res) {
      api.groups.csv(req, res);
  });

  // approve & process previous CSV
  router.route('/groups/csv/process')
    .post(function(req, res) {
      api.groups.addFromCSV(req, res);
  });

  //see if a group has finished processing its csv
  router.route('/groups/csv/check/:id')
    .get(function(req, res) {
      api.groups.checkCSVInProcess(req.params.id, req, res);
    });


  // API Root - lists the endpoints available
  router.get('/', function(req, res){
    res.json({ message: 'welcome to the api, enjoy your stay.' });
  });

  app.use('/api/v1', router);
};

module.exports = routes;
