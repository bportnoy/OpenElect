var db = require('../config');
var Ballot = require('../models/ballot');

var Ballots = new db.Collection();

Ballots.model = Ballot;

module.exports = Ballots;