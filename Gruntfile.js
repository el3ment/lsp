module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserstack_list: {
      dev: {
        username: 'rpottorff@gmail.com',
        password: 'hash4790!@#'
      }
    },
    browserstack: {
      dev: {
        credentials: {
          username: 'rpottorff@gmail.com',
          password: 'hash4790!@#'
        },
        // optional tunnel configuration - if omitted a tunnel is not started
        //tunnel: {
          // your BrowserStack API key
          // key: 'AgbPRotp3pFOX58Cyu50',
          // a list of hostnames and ports to expose
          //hosts: [{
          //  name: 'HOSTNAME',
          //  port: PORT,
          //  sslFlag: 0
          //}]
        //},
        // required worker start configuration
        start: {
          // time to wait for workers to start running
          //queueTimeout: QUEUE_TIMEOUT,
          // default URL for started workers
          url: 'http://google.com',
          // default timeout for started workers
          //timeout: TIMEOUT,
          // list of browser types to start, as returned from the list function
          browsers: [{ version: '4.0', device: 'iPhone 4', os: 'ios' },{ version: '20.0', browser: 'firefox', os: 'mac' }]
          }
        }
      },
      browserstack_clean: {
        dev: {
          username: 'rpottorff@gmail.com',
          password: 'hash4790!@#'
        }
      },
      jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          $: true,
          console: true
        }
      },
      'lonestarpercussion': {
        src: [ 'app/webroot/**/*.js' ]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserstack');

  // Default task(s).
  grunt.registerTask('default', ['browserstack_list', 'browserstack', 'browserstack_clean']);
  //grunt.registerTask('default', ['jshint:lonestarpercussion']);

};