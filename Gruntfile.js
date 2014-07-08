module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
					console: true
				}
			},
			'lonestarpercussion': {
				src: [ 'app/webroot/js/controllers/**/*.js', 'app/webroot/js/assets/**/*.js','app/webroot/js/models/**/*.js', 'app/webroot/js/utilities/**/*.js' ]
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
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-browserstack');

	// Default task(s).
	//grunt.registerTask('default', ['browserstack_list', 'browserstack', 'browserstack_clean']);
	grunt.registerTask('default', ['jshint:lonestarpercussion']);

};