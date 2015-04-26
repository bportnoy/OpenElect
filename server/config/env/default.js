/**
 * Default Configuration for all environments
 */
'use strict';

var path = require('path');
var _ = require('lodash');
var env = process.env.NODE_ENV || 'development';
var envConfig = require('./' + env);

// All configurations will extend these options
var defaults = {
  server: {
    // Port to run server on
    port: process.env.PORT || 9010,
    // Host/URL to run server on
    host: process.env.HOSTNAME || '127.0.0.1',
    // Log level
    logLevel: 'dev',
    // Paths to ignore when redirecting back
    // to original location after logging in
    loginIgnorePaths: [
      'auth',
      'login',
      'logout',
      'signup',
      'favicon',
      'images',
      'scripts',
      'styles',
      'bower_components'
    ]
  },
  database: {
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: 'utf8',
      port: process.env.DB_PORT
    }, 
    debug: true
  },
  root: path.normalize(__dirname + '/../../..'),
  staticAssets: 'client',
  security: {
    // Arrays of URLs to whitelist from security policies
    whitelists: {
      csrfWhitelist: [],
      cspWhitelist: [],
      xframeWhitelist: [],
      p3pWhitelist: [],
      hstsWhitelist: [],
      xssProtectionWhitelist: []
    },
    // Lusca security configuration
    config: {
      csrf: true,
      csp: false,
      xframe: 'SAMEORIGIN',
      p3p: false,
      hsts: false,
      xssProtection: true
    }
  }
};

// Export the config object based on the NODE_ENV
module.exports = _.merge(defaults, envConfig);
