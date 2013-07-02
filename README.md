Common gruntfile
================

Common grunt process for libraries.

Performs
--------

###`grunt test` or `grunt`

- linting with jsHint
- unit tests with jsTestDriver

###`grunt build`

testing, plus

- concatenation
- minification

###`grunt doc`

- generating jsDoc

Example Gruntfile.js
--------------------

```javascript
module.exports = function (grunt) {
    "use strict";

    var params = {
        "files": [
            "js/foo.js",
            "js/bar.js"
        ],

        "test": [
            "js/jsTestDriver.conf"
        ],

        "globals": {
            "jQuery": true
        }
    };

    require('common-gruntfile')(grunt, params);
};
```

Required npm dev packages
-------------------------

Add these to the "devDependencies" section of "package.json":

```json
"grunt"               : "~0.4.1",
"common-gruntfile"    : "git://github.com/danstocker/common-gruntfile.git",
"grunt-jstestdriver"  : "git://github.com/danstocker/grunt-jstestdriver.git",
"grunt-contrib-concat": "~0.3.0",
"grunt-contrib-jshint": "~0.5.4",
"grunt-yui-compressor": "~0.3.0",
"grunt-contrib-copy"  : "~0.4.1",
"grunt-jsdoc"         : "~0.3.3",
"grunt-regex-replace" : "~0.2.5",
"QUnitAdapter"        : "https://dl.dropboxusercontent.com/u/9258903/packages/QUnitAdapter-0.1.0.tgz"
```
