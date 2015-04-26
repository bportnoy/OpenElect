// Configuration for Node Environment task(s)
// Sets up development environment for Node server
'use strict';

var localConfig;
try {
  localConfig = require('../../../server/config/secrets');
} catch(e) {
  localConfig = {};
}

var taskConfig = function(grunt) {

  grunt.config.set('env', {
    dev: {
      NODE_ENV: 'development',
      DB_HOST: "localhost",
      DB_USER: "openelect",
      DB_PASSWORD: "openelect",
      DB_NAME: "openelect",
      PORT: "5432",
    },
    prod: {
      NODE_ENV: 'production'
    },
    all: localConfig
  });

};

module.exports = taskConfig;
