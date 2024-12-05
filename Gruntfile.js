module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      uglify: {
        prod: {
            files: [{
                compress: true,
                src: ['src/bkmlt/program.js'],
                dest: 'proglang.js'
            }]
        }
      },
      concat: {
        options: {
          separator: ''
        },
        dist: {
          src: ['src/bkmlt/prepend.txt','src/bkmlt/searchstring.js','proglang.js','src/bkmlt/postpend.txt'],
          dest: 'proglang.js'
        }
      }
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Task definitions
    grunt.registerTask('default', ['uglify:prod','concat']);
};