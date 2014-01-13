// *******************
// * Gruntfile.js
// *
// -------------------

module.exports = function (grunt) {
  'use strict';

  var fs = require('fs')

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // LESS Task
    // -----------------
    less: {
      compile: {
        files: {
          'dist/css/style.css': 'assets/stylesheets/build.less'
        }
      }
    },

    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['default'],
        options: {
          livereload: true
        }
      },
      stylesheets: {
        files: '**/**/*.less',
        tasks: ['less'],
        options: {
          livereload: true
        }
      }
    }

  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  // CSS distribution task.
  grunt.registerTask('dist-stylesheets', ['less']);

  // Full distribution task.
  grunt.registerTask('dist', ['dist-stylesheets']);

  // Default task.
  grunt.registerTask('default', ['dist', 'watch']);

};
