var db = require('../config');
var Election = require('../models/election');

var Elections = new db.Collection();

Elections.model = Election;

module.exports = Elections;