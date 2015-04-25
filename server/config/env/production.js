/**
 * Production Configuration
 */
'use strict';

// Production specific configuration
var prodConfig = {
  logLevel: 'short',
  NODE_ENV: 'production',
  DB_HOST: process.env.RDS_HOSTNAME,
  DB_USER: process.env.RDS_USERNAME,
  DB_PASSWORD: process.env.RDS_PASSWORD,
  DB_NAME: "openelect",
  PORT: process.env.RDS_PORT
};

module.exports = prodConfig;
