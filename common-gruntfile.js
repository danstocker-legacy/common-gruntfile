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

        concat: {
            options: {
                separator   : '',
                stripBanners: true,
                banner      : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                              '<%= grunt.template.today("yyyy-mm-dd") %> - ' +
                              '<%= pkg.author %> - <%= pkg.copyright %>*/\n'
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
    grunt.registerTask('build', ['test', 'concat', 'copy:main', 'min']);

    grunt.registerTask('default', ['test']);
};
