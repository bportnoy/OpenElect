// Configuration for Node Environment task(s)
// Sets up development environment for Node server
'use strict';


var taskConfig = function(grunt) {

  grunt.config.set('env', {
    dev: {
      NODE_ENV: 'development',
      DB_HOST: "localhost",
      DB_USER: "skillfulcactus-dev",
      DB_PASSWORD: "skdev",
      DB_NAME: "skillfulcactus",
      PORT: "5432",
      // SESSION_SECRET: "sk-dev-secret"
    },
    prod: {
      NODE_ENV: 'production'
    },
    all: {
      SESSION_SECRET: "sk-dev-secret"
      // Environment variables that are always loaded

    }
  });

};

module.exports = taskConfig;
