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
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'src/stylesheets/style.css.map',
          sourceMapFilename: 'dist/css/style.css.map'
        },
        files: {
          'dist/css/style.css': 'src/stylesheets/build.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'dist/css/style.min.css': 'dist/css/style.css'
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
      },
      templates: {
        files: 'demo/**/*.html',
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
