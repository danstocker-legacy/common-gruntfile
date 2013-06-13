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

Example
-------

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
