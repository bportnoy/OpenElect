/**
 * Production Configuration
 */
'use strict';

console.log('should have the following variables:');
console.log('process.env.RDS_HOSTNAME', process.env.RDS_HOSTNAME);
console.log('process.env.RDS_HOSTNAME', process.env.RDS_USERNAME);
console.log('process.env.RDS_HOSTNAME', process.env.RDS_PASSWORD);
console.log('process.env.RDS_HOSTNAME', process.env.RDS_PORT);

// Production specific configuration
var prodConfig = {
  logLevel: 'dev',
  NODE_ENV: 'production',
  DB_HOST: process.env.RDS_HOSTNAME,
  DB_USER: process.env.RDS_USERNAME,
  DB_PASSWORD: process.env.RDS_PASSWORD,
  DB_NAME: "ebdb",
  PORT: process.env.RDS_PORT
};

module.exports = prodConfig;
