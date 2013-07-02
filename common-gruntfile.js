module.exports = function (grunt, params) {
    "use strict";

    var config = {
        pkg: grunt.file.readJSON('package.json'),

        params: params,

        outPath           : 'out',
        fileNameVersion   : '<%= pkg.name %>-<%= pkg.version %>.js',
        filePath          : '<%= pkg.name %>.js',
        filePathVersion   : '<%= outPath %>/<%= pkg.name %>-<%= pkg.version %>.js',
        filePathVersionMin: '<%= outPath %>/<%= pkg.name %>-<%= pkg.version %>-min.js',

        /**
         * Concatenates project files into a final output file, according to
         * file list specified in params.
         */
        concat: {
            options: {
                separator: '',
                banner   : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                           '<%= grunt.template.today("yyyy-mm-dd") %> - ' +
                           '<%= pkg.author %> - <%= pkg.copyright %>*/\n'
            },

            dist: {
                src : '<%= params.files %>',
                dest: '<%= filePath %>'
            }
        },

        /**
         * Minifies output file.
         */
        min: {
            dist: {
                src : ['<%= filePath %>'],
                dest: '<%= filePathVersionMin %>'
            }
        },

        /**
         * Copies output file to output folder by name w/ version number included.
         */
        copy: {
            main: {
                files: [
                    {src: '<%= filePath %>', dest: '<%= filePathVersion %>'}
                ]
            }
        },

        /**
         * Runs jsHint code quality assessment.
         */
        jshint: {
            options: {
                globals: '<%= params.globals %>',
                ignores: ['js/**/*.test.js']
            },

            all: ['Gruntfile.js', 'js/**/*.js']
        },

        /**
         * Runs unit tests.
         * JSTestDriver service must be started.
         * See https://github.com/rickyclegg/grunt-jstestdriver#starting-the-server
         */
        jstestdriver: {
            files: '<%= params.test %>'
        },

        /**
         * Generates documentation
         */
        jsdoc: {
            dist: {
                src    : '<%= params.files %>',
                options: {
                    destination: 'doc'
                }
            }
        },

        /**
         * Strips out assumed class instantiation (new Xxxx) from generated documentation.
         */
        "regex-replace": {
            strip: {
                src    : ['doc/<%= pkg.name%>.*.html'],
                actions: [
                    {
                        name   : 'stripNew',
                        search : '(<div class="container-overview">)\\s*<dt>[\\w<>="-/\\s]*?</dt>',
                        replace: '$1'
                    }
                ]
            }
        }
    };

    grunt.initConfig(config);

    // test-related tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jstestdriver');
    grunt.registerTask('test', ['jshint', 'jstestdriver']);

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-regex-replace');
    grunt.registerTask('doc', ['jsdoc', 'regex-replace:strip']);

    // build-related tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-yui-compressor');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('build', ['test', 'concat', 'copy:main', 'min']);

    grunt.registerTask('default', ['test']);
};
