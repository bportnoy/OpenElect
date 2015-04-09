/**
 * Node Server Configuration
 */
'use strict';

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

// Verify database connection and sync tables
// db.sequelize.authenticate().complete(function(err) {
//   if (!!err) {
//     throw '✗ Database Connection Error: '.red + err;
//   }
//   else {
//     console.log('✔ Database Connection Success!'.green);
//     db.sequelize.sync()
//       .success(function() {
//         console.log('✔ Database Synced!'.green);
//       }).error(function() {
//         throw '✗ Database Not Synced!'.red;
//       });
//   }
// });

// Start Express server.
app.listen(app.get('port'), function() {
  console.log('✔ Express server listening on port '.green + '%d'.blue + ' in '.green + '%s'.blue + ' mode'.green, app.get('port'), app.get('env'));
});

module.exports = app;
