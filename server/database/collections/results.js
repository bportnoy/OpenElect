var db = require('../config');
var Result = require('../models/result');

var Results = new db.Collection();

Results.model = Result;

module.exports = Results;