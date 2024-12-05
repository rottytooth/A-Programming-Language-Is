module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      uglify: {
        prod: {
            files: [{
                compress: true,
                src: ['src/proglang.js'],
                dest: 'proglang_min.js'
            }]
        }
      },
      concat: {
        options: {
          separator: ''
        },
        dist: {
          src: ['src/prepend.txt','src/searchstring.js','proglang_min.js','src/postpend.txt'],
          dest: 'proglang_min.js'
        }
      }
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Task definitions
    grunt.registerTask('default', ['uglify:prod','concat']);
};