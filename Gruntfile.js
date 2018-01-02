/*
 * grunt-math
 * https://github.com/rrider/grunt-math
 *
 * Copyright (c) 2015 Ron Rider
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    math: {
      simple_expressions: {
        options: {
          variables: {
            a: 2,
            b: 3
          }
        },
        files: {
          'tmp/simple_expressions': ['test/fixtures/simple_expressions']
        }
      },
      mathjs_expressions: {
        options: {
          variables: {
          }
        },
        files: {
          'tmp/mathjs_expressions': ['test/fixtures/mathjs_expressions']
        }
      },
      options_eval_precision: {
        options: {
          eval_precision: 7
        },
        files: {
          'tmp/options_eval_precision': ['test/fixtures/options_eval_precision']
        }
      },
      options_number: {
        options: {
          eval_precision: 2,
          number: 'BigNumber',
          precision: 5
        },
        files: {
          'tmp/options_number': ['test/fixtures/options_number']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'math', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
