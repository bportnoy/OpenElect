// Configuration for Knyle Style Sheet task(s)
// Generates styleguide documentation based on stylesheet comments
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('styleguide', {
    options: {

      framework: {
        name: 'kss'
      },

      name: 'Style Guide',

      template: {
        src: '<%= yeogurt.client %>/docs/styleguide'
      }

    },
    server: {
      files: {
        '<%= yeogurt.tmp %>/docs/styleguide': [
          '<%= yeogurt.client %>/styles/*.*'
        ]
      }
    },
    dist: {
      files: {
        '<%= yeogurt.dist %>/client/docs/styleguide': [
          '<%= yeogurt.client %>/styles/*.*'
        ]
      }
    }
  });

};

module.exports = taskConfig;
