/**
 * API Routes
 */

'use strict';

var api = require('../controllers/api');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var routes = function(app) {

  router.get('/', function(req, res){
    res.json({ message: 'welcome to the api, enjoy your stay.' });
  });

  /**
   *  routes for elections
   */

  router.route('/elections/create') // create an election - post only
    .post(function(req, res) {
      api.elections.create(req, res);
    });

  router.route('/elections/id/:id') // retrieve or update a specific election by id
    .get(function(req, res) {
      api.elections.getById(req.params.id, req, res);
    })
    .post(function(req, res) {
      api.elections.updateById(req.params.id, req, res);
    });


  /**
   *  routes for polls
   */

  router.route('/polls/create') // create a poll - post only
    .post(function(req, res) {
      // todo - add controller
    });
  
  router.route('/polls/id/:id') // retrieve or update a specific poll by id
    .get(function(req, res) {
      // todo - add controller
    })
    .post(function(req, res) {
      // todo - add controller
    });


  /**
   *  routes for ballots
   */

  router.route('/ballots/create') // create a ballot (user submits vote) - post only
    .post(function(req, res) {
      // todo - add controller
    });

  app.use('/api/v1', router);
};

module.exports = routes;
