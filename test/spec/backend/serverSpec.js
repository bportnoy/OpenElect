// var chai = require('chai');
// var expect = chai.expect;
// var request = require('request');
// var env = process.env.NODE_ENV || 'development';
// var host = process.env.HOSTNAME || '127.0.0.1';
// var port = process.env.PORT || 9010;
// var localServerUri = host + ":" + port;
// var invalidUri = host + ":" + port + '/invalid';

var express = require("express");
var request = require("supertest-as-promised");
var app = require('../../../server.js');

describe('Node server', function(){

  describe('Basic http routing', function(){
    it('should receive 200 status code on GET request', function(done){
      request(app)
      .get('/')
      .expect(200)
      .then(done());
    });

    it('should receive 404 status code on Get request to an invalid endpoint', function(done){
      request(app)
      .get('/invalid')
      .expect(404)
      .then(done());
    });    
  });
});
