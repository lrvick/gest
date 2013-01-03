var exec = require('child_process').exec

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: '<json:package.json>',
        concat: {
            dist: {
                src: ['src/<%= pkg.name %>.core.js','src/<%= pkg.name %>.*.js'],
                dest: 'dist/<%= pkg.name %>.js',
                separator: ';'
            }
        },
        min: {
            dist: {
                src: ['dist/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.min.js',
            },
        },
    });

    grunt.registerTask('default', 'concat min');

    grunt.registerTask('docs', 'Generate documentation using dox', function() {
        var cb = this.async()
        var child = exec("cat src/*.js src/*/*.js | dox | node support/docs.js > docs/index.html", 
            function(err, stdout, stderr) {
                if(stdout) {
                    console.log('stdout: ', stdout)
                }
                if(stderr) {
                    console.log('stderr: ', stderr)
                }
                if(err !== null) {
                    console.log('exec error: ', err)
                }
                cb()
            }
        )  
    });

}
