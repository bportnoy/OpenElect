var db = require('../config');
var Poll = require('../models/poll');

var Polls = new db.Collection();

Polls.model = Poll;

module.exports = Polls;