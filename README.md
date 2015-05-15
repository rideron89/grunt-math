# grunt-math

> Evaluate math expressions with grunt

`grunt-math` makes use of the `Math.js` library for Javascript and Node.js. Their [documentation](http://mathjs.org/docs) can be used to form the math expressions used by `grunt-math`.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-math --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-math');
```

## The "math" task

### Overview
In your project's Gruntfile, add a section named `math` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    math: {
        options: {
            precision: 5 // sets bignumber precision,
            variables: {
                columns: 12,
                column_padding: 20
                max_content_width: 660
            }
        },
        files: {
            'output.html': ['input.html']
        }
    },
});
```

### Options

All `Math.js` configuration options are available. Documentation for `Math.js` options are taken directly from [their site](http://mathjs.org/docs/configuration.html). Please note, `grunt-math` uses the `eval` function for evaluating expressions.

You can use the option `variables` to setup variables for use within expressions.

#### options.epsilon
Type: `Number`
Default value: `1e-14`

The minimum relative difference used to test equality between two compared values. This value is used by all relational functions.

#### options.eval_precision
Type: `Integer`
Default: `3`
Available values: `0-15`

The number of decimal places used when evaluating expressions. This option will only be used if `options.number` is set to `number`.

#### options.matrix
Type: `String`
Default: `matrix`
Available values: `matrix` or `array`

The default type of matrix output for functions. Available values are: `matrix` (default) or `array`. Where possible, the type of matrix output from functions is determined from the function input: An array as input will return an Array, a Matrix as input will return a Matrix. In case of no matrix as input, the type of output is determined by the option matrix. In case of mixed matrix inputs, a matrix will be returned always.

#### options.number
Type: `String`
Default: `number`
Available values: `number` or `bignumber`

The default type of numbers. This setting is used by functions like `eval` which cannot determine the correct type of output from the functions input. For most functions though, the type of output is determined from the the input: a number as input will return a number as output, a BigNumber as input returns a BigNumber as output. Available values are: `number` (default) or `bignumber`. BigNumbers have higher precision than the default numbers of JavaScript.

#### options.precision
Type: `Integer`
Default: `64`

The maximum number of significant digits for bigNumbers. This setting only applies to BigNumbers, not to numbers. Default value is 64.

#### options.variables
Type: `Object`
Default: `{}`

Set of properties to initialize as variables for use within the `Math.js` parser.

Example:

```js
options {
    variables: {
        alpha: 5,
        bravo: 25
    }
}
```

This allows you to form expressions in the like so:

```js
gruntmath((5 * alpha) + bravo); // returns 50
```

### Example

An HTML file with the following markup:

```html
<div>
    gulpmath(abc = 5);
    <p>There are gulpmath(10 * 2 - abc); meese in the lodge.</p>
</div>
```

Will output the following:

```html
<div>
    <p>There are 15 meese in the lodge.</p>
</div>
```

You can escape semi-colons in your expressions if you need to use them:

```javascript
gulpmath(5\;20); // returns [20]
```

### Known Issues

Unit conversions work, but the results may produce unusual results:

```javascript
gulpmath(5.08 cm to inch); // on Windows, this produces 2.0000000000000004 inch
```