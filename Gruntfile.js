/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
   // Project configuration.
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      useminPrepare: {
         html: 'index.html'
      },
      usemin: {
         html: ['index.html']
      },
      uglify: {
         options: {
            report: 'min',
            mangle: false
         }
      },
      copy: {
         main: {
            files: [
               {expand: true, cwd: 'dist/app/', src: '*', dest: 'app/'},
               {expand: true, cwd: 'dist/assets/css/', src: '*', dest: 'assets/css/'}
            ]
         }
      },
      cachebreaker: {
         dev: {
            options: {
               match: ['app/application.js', 'assets/css/app.css', 'app/vendor.js', 'assets/css/vendor.css']
            },
            files: {src: ['index.html']}
         }
      },
      gitinfo: {
         options: {
             cwd: '.'
         }
      },
      replace: {
         dist: {
            options: {
               patterns: [
                  {
                    match: 'version',
                    replacement: "v1.1"   // hard coded version value
                  },
                  {
                    match: 'git_repo',
                    replacement: "http://git.xavient.com/outlook2web/docmgr_fe"
                  },
                  {
                    match: 'short_sha',
                    replacement: "<%= gitinfo.local.branch.current.shortSHA %>"
                  },
                  {
                    match: 'full_sha',
                    replacement: "<%= gitinfo.local.branch.current.SHA %>"
                  },
                  {
                    match: 'branch',
                    replacement: "<%= gitinfo.local.branch.current.name  %>"
                  },
                  {
                    match: 'timestamp',
                    replacement: "<%= grunt.template.today('mm/dd/yyyy h:MM TT Z')  %>"
                  }        
               ]
            },
           files: [
             {expand: true, flatten: true, src: ['./build-info.html'], dest: './'}
           ]
         }
      }
   });

   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-usemin');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-cache-breaker');
   grunt.loadNpmTasks('grunt-gitinfo');
   grunt.loadNpmTasks('grunt-replace');

   grunt.registerTask('default', ['gitinfo', 'replace', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin', 'copy','cachebreaker']);
};