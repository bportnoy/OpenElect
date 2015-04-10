var chai = require('chai');
var expect = chai.expect;
var db = require('../../../server/config/database');
var models = require('../../../server/database/models');
// var request = require('request');
// var host = process.env.HOSTNAME || '127.0.0.1';
// var port = port: process.env.PORT || 9010;
// var localServerUri = host + ":" + port;

var express = require("express");
var reque
var app = express();
var Ballot = require('../../../server/database/models/ballot');
var Election = require('../../../server/database/models/election');
var Group = require('../../../server/database/models/group');
var Poll = require('../../../server/database/models/poll');
var Question = require('../../../server/database/models/question');
var Session = require('../../../server/database/models/session');
var User = require('../../../server/database/models/user');

describe('Check if all tables can acccept and retrun data', function(){
  describe('Get data from each table', function(){
    User.forge({id:'0', email:'fred@gmail.com', password:'00', first_name:'Fred', last_name:'Zirdung', admin_level:'0'}).save();
    it('should return user info', function(done){
      // expect(User.query('where', '_id', '=', '0'))
    })
  });
});