module.exports = function(grunt) {

	//var mozjpeg = require('imagemin-mozjpeg');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		// JSHint enforces standard-practice code styes
		// and helps prevent errors
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
				camelcase: true,
				indent: true,
				quotmark: true,
				loopfunc : true,
				passfail: true,
				globals: {
					jQuery: true,
					$: true,
					console: true,
					requirejs: true,
					define: true,
					_gaq: true,
					LSP: true,
					require: true
				}
			},
			'lonestarpercussion': {
				src: [ 'app/webroot/js/controllers/**/*.js']//, 'app/webroot/js/assets/**/*.js','app/webroot/js/models/**/*.js', 'app/webroot/js/utilities/**/*.js' ]
			}
		},

		// Uglify is a minifier for javascript
		uglify: {
			options : {
				report : 'gzip',
				mangle : true,
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'app/webroot/js',
					src: ['**/*.js', '!vendors/netsuite/**/*'], //'!vendors/**/*'],
					dest: 'app/webroot/min/js'
				}]
			}
		},

		// SASS runs the SASS pre-processor on the sass files we use
		sass: { // Task
			dist: {
				options: {
					style: 'compressed'
				},
				files: [{
					expand: true,
					cwd: 'app/webroot/css',
					src: ['**/*.scss'],
					dest: 'app/webroot/min/css',
					ext: '.css'
				}]
			}
		  },


		// Clean clears directories or removes files
		clean: {
			cache : {
				src : ["app/tmp/cache/cake_**", "app/tmp/logs/*.log"]
			},
			js : {
				src: ["app/webroot/min/js"]
			},
			css : {
				src: ["app/webroot/min/css"]
			}
		},

		concat: {
			options: {
				// define a string to put between each file in the concatenated output
			    separator: ';'
			},
			core: {
				 // the files to concatenate
				 src: ['app/webroot/min/js/vendors/jquery/*.js', 'app/webroot/min/js/utilities/global.js', 'app/webroot/min/js/controllers/application.js'],
				 // the location of the resulting JS file
				 dest: 'app/webroot/min/js/combined/core.js'
			},
			search: {
				 // the files to concatenate
				 src: ['app/webroot/min/js/models/api.js','app/webroot/min/js/models/easyask.js','app/webroot/min/js/plugins/search.js'],
				 // the location of the resulting JS file
				 dest: 'app/webroot/min/js/combined/search.js'
			},
			netsuite: {
				 // the files to concatenate
				 src: ['app/webroot/min/js/controllers/netsuite.js','app/webroot/min/js/controllers/checkout.js','app/webroot/min/js/vendors/netsuite/interface.js'],
				 // the location of the resulting JS file
				 dest: 'app/webroot/min/js/combined/netsuite.js'
			}
		},

		// Watch looks at files and runs scripts when those files have been modified
		watch: {
			scripts : {
				files : 'app/webroot/js/**/*.js',
				tasks : ['clean:js', 'uglify', 'copy'],
			},
			sass : {
				files : 'app/webroot/css/**/*.scss',
				tasks : ['clean:css', 'sass'],
				options : { nospawn : true }
			}
		},

		// CasperJS is the CSS testing driver
		casperjs: {
			options: {
				loadImages: false,
				casperjsOptions: ['--ignore-ssl-errors=true'],
				async: {
					 parallel: false
				}
			},
			files: ['tests/phantomcss/**/*.js', '!tests/config.js']
		},

		// DOCCO creates annotated documentation
		docco: {
			debug: {
				src: ['app/webroot/js/**/*.js', '!app/webroot/js/vendors'],
				options: {
					output: 'docs/'
				}
			}
		},

		// Webdriver runs WebdriverCSS test suites
		webdriver: {
			options: {
				//timeout: 5000000,
				reporter: 'min',
				host: 'ondemand.saucelabs.com',
				port: 80,
				user: 'lonestarpercussion',
				key: '9ce21df1-d3d8-4ed5-a9a5-155ee0391eba',
				desiredCapabilities: {
					browserName: 'iexplore',
					version: '8',
					platform: 'Windows 7',
					//'tunnel-identifier': 'lsp-tunnel-dev',
					screenWidth: [320, 400, 970, 1024]
				}
			},
			firefox : {
				options: {
					//host: 'localhost',
					//port: 4444,
					desiredCapabilities:{
						browserName: 'firefox',
						screenWidth: [1024]
					}
				},
				tests : 'tests/webdriver/suite.js'
			},
			chrome : {
				options: {
					//host: 'localhost',
					//port: 4444,
					desiredCapabilities:{
						browserName: 'chrome',
						screenWidth: [1024]
					}
				},
				tests : 'tests/webdriver/suite.js'
			},
			android : {
				options: {
					desiredCapabilities:{
						//'tunnel-identifier': 'lsp-tunnel-dev',
						browserName: 'chrome',
						screenWidth: [400]
					}
				},
				tests : 'tests/webdriver/suite.js'
			},
			safari : {
				options: {
					desiredCapabilities:{
						//'tunnel-identifier': 'lsp-tunnel-dev',
						browserName: 'safari',
						screenWidth: [1024]
					}
				},
				tests : 'tests/webdriver/suite.js'
			},
			ios : {
				options: {
					desiredCapabilities:{
						//'tunnel-identifier': 'lsp-tunnel-dev',
						browserName: 'safari',
						screenWidth: [320]
					}
				},
				tests : 'tests/webdriver/suite.js'
			},
			ie9 : {
				options : {
					desiredCapabilities: {
						//'tunnel-identifier': 'lsp-tunnel-dev',
						browserName: 'iexplore',
						version: '9',
						platform: 'Windows 7',
						screenWidth: [1024]
					}
				},
				tests : 'tests/webdriver/suite.js'
			},
			ie10 : {
				options : {
					desiredCapabilities: {
						//'tunnel-identifier': 'lsp-tunnel-dev',
						browserName: 'iexplore',
						version: '10',
						platform: 'Windows 7',
						screenWidth: [1024]
					}
				},
				tests : 'tests/webdriver/suite.js'
			},
			ie11 : {
				options : {
					desiredCapabilities: {
						//'tunnel-identifier': 'lsp-tunnel-dev',
						browserName: 'iexplore',
						version: '11',
						platform: 'Windows 7',
						screenWidth: [1024]
					}
				},
				tests : 'tests/webdriver/suite.js'
			}
		},

		copy: {
		  main: {
		    files: [
		      // includes files within path
		      {expand: true, cwd: 'app/webroot/js/vendors/netsuite', src: ['**'], dest: 'app/webroot/min/js/vendors/netsuite'},
		      {expand: true, cwd: 'app/webroot/css/vendors', src: ['**'], dest: 'app/webroot/min/css/vendors/'}],
		      //{src: ['app/webroot/js/vendors/**'], dest: 'dest/'}],
		      //{src: ['app/webroot/js/vendors/*'], dest: 'app/webroot/min/js/vendors/'}]
		  }
		},
		  imagemin: {                          // Task
		    static: {                          // Target
		      // options: {                       // Target options
		      //   optimizationLevel: 3,
		      //   svgoPlugins: [{ removeViewBox: false }],
		      //   use: [mozjpeg()]
		      // },
		      files: [{
		        expand: true,                  // Enable dynamic expansion
		        cwd: 'app/webroot/img',                   // Src matches are relative to this path
		        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
		        dest: 'app/webroot/min/img'                  // Destination path prefix
		      }]
		    },
		    // dynamic: {                         // Another target

		    // }
		  }
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-webdriver');
	grunt.loadNpmTasks('grunt-casperjs');
	grunt.loadNpmTasks('grunt-docco');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Default task(s).
	grunt.registerTask('default', ['clean', 'uglify', 'copy', 'concat', 'sass', 'imagemin']);
	grunt.registerTask('js', ['uglify', 'copy', 'concat']);
	grunt.registerTask('webdrivercss', ['webdriver']);
	grunt.registerTask('phantomcss', ['casperjs']);
	grunt.registerTask('docs', ['docco']);
};