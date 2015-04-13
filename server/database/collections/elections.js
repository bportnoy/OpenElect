var db = require('../../config/database');
var Election = require('../models/election');

var Elections = new db.Collection();

Elections.model = Election;

module.exports = Elections;