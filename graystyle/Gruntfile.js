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

    // ImageMin Task
    // -----------------
    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/images/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'dist/img/'                  // Destination path prefix
        }]
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

  grunt.registerTask('dist-images', ['imagemin']);

  // CSS distribution task.
  grunt.registerTask('dist-stylesheets', ['less']);

  // Full distribution task.
  grunt.registerTask('dist', ['dist-stylesheets', 'dist-images']);

  // Default task.
  grunt.registerTask('default', ['dist', 'watch']);

};
