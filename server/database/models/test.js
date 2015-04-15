var db = require('../../config/database');
// var Ballot = require('./ballot');
var Election = require('./election');
// var User = require('./user');
// var Question = require('./question');
// var Group = require('./group');
// var Poll = require('./poll');
// var Promise = require('bluebird');

var elec = new Election({id:6}).fetch().then(function(election){
 election.tabulate()
 .then(function(el){
   console.log(el.toJSON().results)
 })
});