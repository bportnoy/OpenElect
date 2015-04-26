/**
 * Production Configuration
 */
'use strict';

// Production specific configuration
var prodConfig = {
  logLevel: 'dev',
  database: {
    connection: {
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: "ebdb",
      port: process.env.RDS_PORT
    },
    debug: false
  }
};

module.exports = prodConfig;
