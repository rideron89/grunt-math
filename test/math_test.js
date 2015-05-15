'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
 */

    exports.math = {
      setUp: function(done) {
        done();
    },
    simple_expressions: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/simple_expressions');
        var expected = grunt.file.read('test/expected/simple_expressions');
        test.equal(actual, expected, 'should test simple expressions involving algebra and variables');

        test.done();
    },
    mathjs_expressions: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/mathjs_expressions');
        var expected = grunt.file.read('test/expected/mathjs_expressions');
        test.equal(actual, expected, 'should test examples of Math.js expressions');

        test.done();
    },
    options_eval_precision: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/options_eval_precision');
        var expected = grunt.file.read('test/expected/options_eval_precision');
        test.equal(actual, expected, 'should test setting the eval_precision option');

        test.done();
    },
    options_number: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/options_number');
        var expected = grunt.file.read('test/expected/options_number');
        test.equal(actual, expected, 'should test setting the number and precision options');

        test.done();
    }
};
