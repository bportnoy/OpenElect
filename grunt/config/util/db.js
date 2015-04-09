'use strict';

var taskConfig = function(grunt) {
  grunt.config.set('pgcreateuser', {
    skillfulcactus: {
      name: 'skillfulcactus-dev'
    }
  });
    // create database
  grunt.config.set('pgcreatedb', {
    skillfulcactus: {
      name: 'skillfulcactus', // will be created 
        connection: {
          user: 'skillfulcactus-dev',
          database: 'skillfulcactus',
        },
      },
  });
};

module.exports = taskConfig;