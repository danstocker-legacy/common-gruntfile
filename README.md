Common gruntfile
================

Common grunt process for libraries.

Performs
--------

- concatenation
- minification
- linting with jsHint
- unit tests with jsTestDriver
- updating self as dependency in local projects

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
