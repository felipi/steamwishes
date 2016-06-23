module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.initConfig({
    watch: {
        files: ['bower_components/*', 'angular/components/*', 'angular/pages/*', 'sass/*'],
        tasks: ['wiredep', 'compass']
    },
    compass: {
            dist: {
                options: {
                    config: "config.rb",
                    force: true
                }
            }
    },
    wiredep: {
      task: {
        src: ['*.html',
              'sass/styles.scss'],
        options: {
            fileTypes: {
                php: {
                block: /(([\s\t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                    detect: {
                      js: /<script.*src=['"](.+)['"]>/gi,
                      css: /<link.*href=['"](.+)['"]/gi
                    },
                    replace: {
                      js: '<script src="{{filePath}}"></script>',
                      css: '<link rel="stylesheet" href="{{filePath}}" />'
                    }
                }
            }
        }
      }
    }
  });

  grunt.registerTask('default', ['wiredep']);
  grunt.registerTask('changes', ['watch']);
};
