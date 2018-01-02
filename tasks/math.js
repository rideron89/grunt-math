/*
 * grunt-math
 * https://github.com/rrider/grunt-math
 *
 * Copyright (c) 2015 Ron Rider
 * Licensed under the MIT license.
 */

 'use strict';

/**
 * Checks if a number is an int.
 */
function isInt(n) {
    return (Number(n) == n && n % 1 === 0);
}

/**
 * Checks if a number is a float.
 */
function isFloat(n) {
    return (Number(n) == n && n % 1 !== 0);
}

module.exports = function(grunt) {

    var chalk = require('chalk');
    var math = require('mathjs');

    grunt.registerMultiTask('math', 'Evaluate math expressions with grunt', function() {
        var options = this.options({
          epsilon: 1e-14,
          eval_precision: 3,
          matrix: 'Matrix',
          number: 'number',
          precision: 64,
          variables: {}
        });
        var parser = math.create(options).parser();

        // evaluate any given variables and parse them into Math.js
        for (var index in options.variables) {
            if (options.variables.hasOwnProperty(index)) {
                parser.set(index, options.variables[index]);
            }
        }

        this.files.forEach(function(f) {
            var src = f.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                var input = grunt.file.read(filepath);
                var output = '';

                var match_result = input.replace(/gruntmath\((([^;]|\\;)+)\);/g, function(match, p1, p2, offset, string) {
                    try {
                        p1 = p1.replace(/\\;/g, ';'); // allows escaped semi-colons
                        var evaluated_result = parser.eval(String(p1));

                        // we have to manually round to precision with 'number' results
                        if (options.number === 'number' && (isInt(evaluated_result) || isFloat(evaluated_result))) {
                            return math.round(evaluated_result, options.eval_precision);
                        }

                        return evaluated_result;
                    } catch(err) {
                        err.lineNumber = 0;

                        if (string && String(string).slice(0, offset).match(/\n/g)) {
                            err.lineNumber = String(string).slice(0, offset).match(/\n/g).length + 1;
                        }

                        if (err.name.toLowerCase() === 'error') {
                            grunt.log.writeln(chalk.red('>> ') + chalk.yellow('Error in \'' + match + '\' (' + filepath + ':' + err.lineNumber + ')'));
                            grunt.log.writeln(chalk.red('>> ') + err.stack);
                        }
                    }
                });

                output = match_result;

                return output;
            });

            grunt.file.write(f.dest, src);

            grunt.log.writeln('File ' + chalk.cyan(f.dest) + ' created.');
        });
    });

};
