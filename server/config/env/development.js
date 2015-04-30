/**
 * Development Configuration
 */
'use strict';

// Development specific configuration
var devConfig = {
  logLevel:'dev',
  database: {
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    },
    debug: true
  }
};
// console.log('from development.js', devConfig);

module.exports = devConfig;
