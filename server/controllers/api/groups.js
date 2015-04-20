/**
 * Group Endpoint Controller
 */

'use strict';

// var User = require('../../database/models/user');
var util = require('../util');
var Promise = require('bluebird');
var parseCSV = Promise.promisify(require('csv-parse'));
var fs = Promise.promisifyAll(require('fs'));
var uuid = require('uuid');
var async = require('async');
var validator = require('validator');
var rimraf = Promise.promisify(require('rimraf'));

var Group = require('../../database/models/group');
var UserController = require('../users');

var Groups = {

  create: function(req, res){
    Group.forge({
      id: uuid.v4(),
      owner_id: req.user.id,
      name: req.body.name
    }).save({},{method: 'insert'}).then(function(group){
      res.status(201).send(group.toJSON());
    }).catch(function(error){
      console.error(error);
      res.status(500).send(error);
    });
  },

  csv: function(req, res) {
    util.makeUploadDir(req.user.id).then(function(success){
      if (success){
        util.moveToUploads(req.user.id, req.files.file.name, req.files.file.path).then(function(path){
          fs.readFileAsync(path).then(function(csvFile){
            parseCSV(csvFile, {columns: ['FirstName', 'LastName', 'EmailAddress']})
            .then(function(parsedCSV){
              //send first 10 lines back to user for review
              var csvPreview = parsedCSV.slice(0,10);
              res.send({csvPreview: csvPreview, filePath: path});
            }).catch(function(error){console.error(error); res.status(500).send()});//parseCSV
          });//readfile
        });//moveToUploads
      }
    });//makeUploadDir
  },

  addFromCSV: function(req, res) {
    fs.readFileAsync(req.body.path).then(function(csv){
      parseCSV(csv, {columns: ['FirstName', 'LastName', 'EmailAddress']}).
      then(function(parsedCSV){
        Group.forge({id: req.body.id}).fetch()
        .then(function(group){
          group.set('pending_adds', true).save()
          .then(function(group){
            res.status(201).send('Adding voters from your list.');
            if (req.body.removeFirst === true) parsedCSV.shift();
            async.eachLimit(parsedCSV, 10, function(row, callback){ //runs an async each in parallel, 10 at a time
              if (validator.isEmail(row.EmailAddress)){
                UserController.addToGroup(row, req.body.id, callback.bind(this));
              }
              callback();//weirdly the bind doesn't work - would love to figure that out.
            }, function (err){
              if (err) console.error('An invitation record failed to process: ' + err);
              group.set('pending_adds', false).save();
            });//async each
          });//iteration/invites
        });//groupfetch
        rimraf(__dirname + '/../../uploads/' + req.user.id + '/').catch(function(err){
          console.error(err);
        });//clean up the user upload folder
      });//parse
    });//fs
  },

  checkCSVInProcess: function(id, req, res) {
    Group.forge({id: id}).fetch()
    .then(function(group){
      res.status(200).send({status: group.get('pending_adds')});
    });
  }
};

module.exports = Groups;