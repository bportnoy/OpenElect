/**
 * Node Server Configuration
 */
'use strict';

// // Enable app monitoring for production
// if ( process.env.NODE_ENV === 'production' ){
// 	require('newrelic');
// }

// Module dependencies.
var express = require('express');

// Add coloring for console output
require('colors');

// Create Express server.
var app = express();

// Database configuration
var db = require('./server/config/database');

// Express configuration
require('./server/config/express')(app, express, db);

// Start Express server.
app.listen(app.get('port'), function() {
  console.log('✔ Express server listening on port '.green + '%d'.blue + ' in '.green + '%s'.blue + ' mode'.green, app.get('port'), app.get('env'));
});

module.exports = app;
