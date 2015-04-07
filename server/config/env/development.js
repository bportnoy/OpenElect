/**
 * Development Configuration
 */
'use strict';

// Development specific configuration
var devConfig = {
  logLevel: 'dev',
  NODE_ENV: 'development',
  DB_HOST: "localhost",
  DB_USER: "skillfulcactus-dev",
  DB_PASSWORD: "skdev",
  DB_NAME: "skillfulcactus",
  PORT: "5432"
};

module.exports = devConfig;
