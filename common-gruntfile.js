module.exports = function (grunt, params) {
    "use strict";

    var config = {
        pkg: grunt.file.readJSON('package.json'),

        params: params,

        outPath           : 'out',
        fileNameVersion   : '<%= pkg.name %>-<%= pkg.version %>.js',
        filePath          : '<%= outPath %>/<%= pkg.name %>.js',
        filePathVersion   : '<%= outPath %>/<%= pkg.name %>-<%= pkg.version %>.js',
        filePathVersionMin: '<%= outPath %>/<%= pkg.name %>-<%= pkg.version %>-min.js',

        concat: {
            options: {
                separator: ''
            },

            dist: {
                src : '<%= params.files %>',
                dest: '<%= filePath %>'
            }
        },

        min: {
            dist: {
                src : ['<%= filePath %>'],
                dest: '<%= filePathVersionMin %>'
            }
        },

        copy: {
            main: {
                files: [
                    {src: '<%= filePath %>', dest: '<%= filePathVersion %>'}
                ]
            }
        },

        jshint: {
            options: {
                globals: '<%= params.globals %>',
                ignores: ['js/**/*.test.js']
            },

            all: ['Gruntfile.js', 'js/**/*.js']
        },

        jstestdriver: {
            files: '<%= params.test %>'
        },

        jsdoc: {
            dist: {
                src    : ['js/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        }
    };

    /**
     * Preparing targets
     * Targets are a list of folders relative to the current folder
     * to where the built file should be copied (versioned, uncompressed)
     * Invoke a push by "> grunt copy:push"
     */
    var targets;
    if (grunt.file.exists('targets.json')) {
        targets = grunt.file.readJSON('targets.json')
            .map(function (item) {
                return     {
                    expand: true,
                    cwd   : '<%= outPath %>',
                    src   : '<%= fileNameVersion %>',
                    dest  : item
                };
            });

        // adding push copy to config
        config.copy.push = {files: targets};
    }

    grunt.initConfig(config);

    // test-related tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jstestdriver');
    grunt.registerTask('test', ['jshint', 'jstestdriver']);

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.registerTask('doc', ['jsdoc']);

    // build-related tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-yui-compressor');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('build', ['test', 'concat', 'min', 'copy:main']);

    grunt.registerTask('default', ['test']);
};
