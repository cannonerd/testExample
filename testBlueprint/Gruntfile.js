module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: { all: ['www/js/*.js'] },

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
                    platformName: "android",
                    platformVersion: "19",
                    app: __dirname + "/platforms/android/ant-build/CordovaApp-debug.apk",
                    host: "localhost",
                    emulator: true,
                    port: 4444
                }
            }
        }  ,
        bgShell: {
            command: {
                bg: true,
                execOpts: {
                    maxBuffer: false
                },
                cmd: 'emulator -avd kitkat'
            }
        }
    });

    //open emulator before doing any tests
    //emulator -avd kitkat -no-skin -no-audio -no-window


//make sure that all the necessary tasks are also defined in
//the dependencies in package.json
    grunt.loadNpmTasks('grunt-bg-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-appium');
    this.registerTask('test', ['bgShell','jshint', 'mochaAppium']);
};

