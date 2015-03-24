module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: { all: ['src/*.js'] },
        mocha_phantomjs: {
            options: {
                'reporter': 'spec',
                'output': 'tests/results/result.xml',
                urls: [
                    'http://localhost:8000/spec/runner.html'
                ]
            },
            all:{
                options:{
                    urls: ['http://localhost:8000/spec/runner.html']}}
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '.'
                }
            }
        },
        mochaAppium: {
            options: {
                // Mocha options
                reporter: 'spec',
                timeout: 6000,
                // Toggles wd's promises API, default:false
                usePromises: true,
                useChaining: true
            },
            android: {
                src: ['spec/test.*.js'],
                options: {
                    deviceName: "Android",
                    //browserName: "selendroid",
                    //automationName: "selendroid",
                    platformName: "android",
                    platformVersion: "19",
                    //aut: "com.mcrm.eydevmcrm:1.0.0",
                    app: __dirname + "/platforms/android/ant-build/CordovaApp-debug.apk",
                    //aut: "com.htc.club:1.7.2",
                    host: "localhost",
                    emulator: true,
                    port: 4444
                }
            }
        }/*  ,
      bgShell: {
            command: {
                bg: true,
                execOpts: {
                    maxBuffer: false
                },
                cmd: 'emulator -avd kitkat'
            }
        }*/
    });

    //open emulator before doing any tests
    //emulator -avd kitkat -no-skin -no-audio -no-window


//make sure that all the necessary tasks are also defined in
//the dependencies in package.json
    //grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-bg-shell');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.loadNpmTasks('grunt-mocha-appium');
    this.registerTask('test', [/*'bgShell',*/'jshint','connect', 'mocha_phantomjs', 'mochaAppium']);
};




