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
var expect = require('chai').expect;
var db = require('../../../server/config/database.js');
var Ballot = require('../../../server/database/models/ballot');
var Election = require('../../../server/database/models/election');
var Group = require('../../../server/database/models/group');
var Poll = require('../../../server/database/models/poll');
var Question = require('../../../server/database/models/question');
var User = require('../../../server/database/models/user');
var passport = require('../../../server/config/passport');

var uuid = require('uuid');

describe('Test server, database, and route setup', function(){
  // Increase timeout to 15s for waiting user signup process
  this.timeout(20000);
  var ballotId, electionId, groupId, pollId, questionId, userId;


  describe('Basic server http routing', function(){
    it('should receive 200 status code when connecting to root', function(done){
      request(app)
      .get('/')
      .expect(200)
      .end(done);
    });

    it('should receive 404 status code when connecting to an invalid endpoint', function(done){
      request(app)
      .get('/invalid')
      .expect(404)
      .end(done);
    });
  });

  describe('Database table checking', function(){
    // Delete test data from tables after testing
    after(function(done){
      User.forge({email: "000@test.com"})
      .fetch()
      .then(function(user, error) {
        if (error) {
          console.log(error);
        }
        console.log("about to destroy", user.toJSON());
        user.destroy();
        done();
      });

      Group.forge({name: "Hack_Reactor"})
      .fetch()
      .then(function(group, error) {
        if (error) {
          console.log(error);
        }
        console.log("about to destroy", group.toJSON());
        group.destroy();
        // done();
      }).end(done);

      Election.forge({name: "2015_Election"})
      .fetch()
      .then(function(election, error) {
        if (error) {
          console.log(error);
        }
        console.log("about to destroy", election.toJSON());
        election.destroy();
        // done();
      }).end(done);

      Poll.forge({name: "8th_floor"})
      .fetch()
      .then(function(poll, error) {
        if (error) {
          console.log(error);
        }
        console.log("about to destroy", poll.toJSON());
        poll.destroy();
        // done();
      }).end(done);

      Question.forge({name: "Funnest guy in Hack Reactor?"})
      .fetch()
      .then(function(question, error) {
        if (error) {
          console.log(error);
        }
        console.log("about to destroy", question.toJSON());
        question.destroy();
        // done();
      }).end(done);

      Ballot.forge({choices:  '{ "selections": [ { "question_id": 2, "selection": null }] }'})
      .fetch()
      .then(function(ballot, error) {
        if (error) {
          console.log(error);
        }
        console.log("about to destroy", ballot.toJSON());
        ballot.destroy();
        done();
      });

      Question.forge({choices:  '{ "selections": [ { "question_id": 2, "selection": null }] }'})
      .fetch()
      .then(function(question, error) {
        if (error) {
          console.log(error);
        }
        console.log("about to destroy", question.toJSON());
        question.destroy();
        done();
      });
    });


    it('should create a new user', function(done){
      new User({
      id: uuid.v4(),
      email: "000@test.com",
      password:"1234",
      first_name:"Skillful",
      last_name:"Cactus",
      admin_level: 0
      }).save({},{method: 'insert'}).then(function(user, error){
        if (error) {
          console.log(error);
        }
        userId = user.id;
        console.log("User created with id ", userId);
        expect(user.toJSON()["email"]).to.equal("000@test.com");
        done();
      });
    });

    it('should create a new group', function(done){
      new Group({
      id: uuid.v4(),
      name: "Hack_Reactor",
      }).save({},{method: 'insert'}).then(function(group, error){
        if (error) {
          console.log(error);
        }
        groupId = group.id;
        console.log("Group created with id: ", groupId);
        expect(group.toJSON()["name"]).to.equal("Hack_Reactor");
        done();
      });
    });

    it('should create a new election', function(done){
      new Election({
      id: uuid.v4(),
      name: "2015_Election",
      description: "HR Test"
      }).save({},{method: 'insert'}).then(function(election, error){
        if (error) {
          console.log(error);
        }
        electionId = election.id;
        console.log("Election created with ID: ", electionId);
        expect(election.toJSON()["name"]).to.equal("2015_Election");
        done();
      });
    });

    it('should create a new poll', function(done){
      new Poll({
      id: uuid.v4(),
      name: "8th_floor",
      }).save({},{method: 'insert'}).then(function(poll, error){
        if (error) {
          console.log(error);
        }
        pollId = poll.id;
        console.log("Poll created with ID: ", pollId);
        expect(poll.toJSON()["name"]).to.equal("8th_floor");
        done();
      });
    });

    it('should create a new ballot', function(done){
      new Ballot({
      id: uuid.v4(),
      choices: '{ "selections": [ { "question_id": 2, "selection": null }] }',
      }).save({},{method: 'insert'}).then(function(ballot, error){
        if (error) {
          console.log(error);
        }
        ballotId = ballot.id;
        console.log("Ballot created: ", ballotId);
        expect(ballot.toJSON()["choices"]).to.equal('{ "selections": [ { "question_id": 2, "selection": null }] }');
        done();
      });
    });

    it('should create a new question', function(done){
      new Question({
      id: uuid.v4(),
      name: "Best team in 8th floor?",
      }).save({},{method: 'insert'}).then(function(question, error){
        if (error) {
          console.log(error);
        }
        questionId = question.id;
        console.log("Question created with ID: ", questionId);
        expect(question.toJSON()["name"]).to.equal("Best team in 8th floor?");
        done();
      });
    });

  });

  describe('Test the routes', function(){
    after(function(done){
      User.forge({email: "001@test.com"})
      .fetch()
      .then(function(user, error) {
        if (error) {
          console.log(error);
        }
        console.log("about to destroy", user.toJSON());
        user.destroy();
        done();
      });

      Election.forge({name: "2nd_test"})
      .fetch()
      .then(function(election, error) {
        if (error) {
          console.log(error);
        }
        console.log("about to destroy", election.toJSON());
        election.destroy();
        // done();
      }).end(done);
    });

    // Disable now because the signup process take too long
    it('should sign up a user', function(done){
      request(app)
      .post('/api/v1//users/signup')
      .send(
        { 'user': {
            'email': '001@test.com',
            'password':'1234',
            'first_name':'Skillful',
            'last_name':'Cactus'
          }
        })
      .expect(201)
      .expect(function(res){
          //Sign up will redirect to Login, the response is not user's object
          console.log("response body", res.body);
          expect(res.body.first_name).to.equal('Skillful');
          expect(res.body.last_name).to.equal("Cactus");
          expect(res.body.email).to.equal("001@test.com");
        })
      .end(done);
    });

    it('should log in an user', function(done){
      request(app)
      .post('/api/v1/users/login')
      .send(
        {
          email: "001@test.com",
          password:"1234"
        }
      )
      .expect(200)
      .end(done);
    });

    it('should have good election route', function(done){
      request(app)
      .get('/api/v1/elections')
      .expect(200)
      .end(done);
    });

    it('should list elections by owner', function(done){
      request(app)
      .get('/api/v1/elections/owner/' + userId)
      .expect(200)
      .end(done);
    });

    it('should create an elections', function(done){
      request(app)
      .post('/api/v1/elections/create')
      .send( {election: { name: "2nd_test", description:"Test Route"}})
      .expect(200)
      .then(function(elec){
        console.log("return election", elec);
        electionId = elec.id;
        expect(elec.name).to.equal("2nd_test");
        expect(elec.description).to.equal("Test Route");
        done();
      })
      .end(done);
    });

    it('should get an election by id', function(done){
      request(app)
      .get('/api/v1/elections/update/'+ electionId)
      .expect(200)
      .then(function(elect){
        // console.log("return election", elect);
        expect(elect.name).to.equal("2015_Election");
        expect(elect.description).to.equal("HR Test");
        done();
      });
    });

    it('should update an election by id', function(done){
      request(app)
      .post('/api/v1/elections/update/'+ electionId)
      .send(
        {
          name: "2017 Test",
          description:"Updated version"
        }
      )
      .expect(200)
      .then(function(elect){
        expect(elect.name).to.equal("2017 Test");
        expect(elect.description).to.equal("Updated version");
        done();
      })
    });
  });
});
