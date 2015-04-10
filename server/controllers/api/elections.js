var bodyParser = require('body-parser');
var election = require('../../database/models/election');

var elections = {

  create: function(req, res) {
    res.status(201);
    res.json({message: 'test'});
  },
  getById: function(id, req, res) {

  },
  updateById: function(id, req, res) {

  }

}

module.exports = elections;