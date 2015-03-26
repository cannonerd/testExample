Testing in hybrid mobile projects with Cordova and Appium
============


The reasoning why to do tests is clear for all. How to implement tests is completely other matter. For typical websites there are many different options. One of the popular frameworks being [Mocha] (http://mochajs.org/) with the help of the asstertion library [Chai] (http://chaijs.com/). For native applications both for Android and iOs different frameworks can also be found. When a project is a combination in of native and web, things get a little bit tricky. If the project uses the capabilities of Cordova to full extent, the testing seases to be simple. The purely JavaScript side of the project can be easily tested and there are a number of good blogposts around that topic.

When we add the Cordova in to the mix, we need to add a testing framework to handle that, in this case I chose [Appium] (http://appium.io/). There is near to no documentation in testing Cordova applications, which leads me to wonder weather or not the hybrid apps are being tested at all.

For a versatile and as fully automated test environment, I'm using Grunt [http://gruntjs.com/] as my foundation. Grunt is a JavaScript task runner. With the help of Grunt I can easily handle all the different kind of test scenarios I will encounter. From testing locally for just one feature, or setting up a full windowless server and running all the tests by kicking up a bunch or Emulators or plugging in  a real device to the server you just happen to runt underneath your desk.

But enough of the background and into practice. In this blog post I will create a small Cordova application running on Android to give you a view on setting up an fully tested app.

Creating a Cordova project
------------

So first we need to create a [Cordova application] (https://cordova.apache.org/docs/en/4.0.0/guide_cli_index.md.html).

~~~
$  cordova create testBlueprint com.basilicom.blueprint testBlueprint
$ cd testBlueprint/
$ cordova platform add android
~~~

Now we have a project with a structure like this:

~~~
config.xml 
hooks
platforms
plugins
www
~~~


Package.jsonn and Gruntfile.js
------------

Add the package.json and Gruntfile.js to the root of the project.

After the package.json has been created to have the project name, developer and devdependencies it is time to install the minimum
amount of dependencies we need, in our case that being 

~~~

  "devDependencies": {
    "chai": "^2.0.0",
    "grunt": "^0.4.5",
    "grunt-contrib-jshint": "^0.11.0",
    "grunt-mocha-phantomjs": "^0.6.0",
    "grunt-mocha-appium": "^0.4.0"
  }
~~~
  
  so the full package.json should look something like this

~~~
{
  "name": "Blueprint",
  "version": "0.1.0",
  "description": "tests",
 "dependencies": {

  },
  "devDependencies": {
    "chai": "^2.0.0",
    "grunt": "^0.4.5",
    "grunt-contrib-jshint": "^0.11.0",
    "grunt-mocha-appium": "^0.4.0"
  },
  "scripts": {
    "test": "grunt test"
  },
  "author": "Susanna Huhtanen, Basilicom gmbh",
  "license": "MIT"
}
~~~




in the scripts section the run command for the tests is defined. For future implementations this can be what Travis or TeamCity will use.


now over to the Gruntfile.js.  As first, we need to form a link between the Gruntfile and the package.json then we need to tell the jshint, where the javascript files for this project are found.


With appium we get a bit trickier setup. And the Appium documentation does not actually help at this point. 

the firs batch of setting up the Appium is the options

~~~
    // Mocha options
                reporter: 'spec',
                timeout: 6000,
                // Toggles wd's promises API, default:false
                usePromises: true,
                useChaining: true
            },
~~~
            
the timeout is the general set timeout for things to timeout sou you would not get stuck into a faulty test forever.
The problem being thought that the timeout can be later set to various lengths. THe timeouts in Appium tests work in 3 different onion like 
layers, so keeping track of which timeout is applied to your different tests at different points is important. HERE BE more of the different 
timeout layers. The uses promising feature of Appium I haven't got working yet to my complete puzzlement, so just leave it there and wait
for an update for this blogpost when I have figured it out.

the next steps are the platform dependent settins. So iOs would be added in the same manner as Android

~~~
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
~~~

so the important parts are the scr, where your tests are and in the app, the location for the actual application built by cordova build
android. So the full Gruntfile would look something like this.


~~~
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
~~~

The root now looks like this:

~~~
config.xml
 Gruntfile.js
 hooks 
 package.json 
platforms
plugins
www
~~~

Now that the Gruntfile and [package.json](https://docs.npmjs.com/files/package.json) are correctly set up, it is time to run npm install from the root of the project.


The nmp install will install the necessary packages in the node_modules folder it creates

~~~
config.xml
Gruntfile.js
hooks
node_modules
npm-debug.log
package.json
platforms
plugins
www
~~~

Now we have a new folder in the root of the project which is called node_modules. DO NOT push this folder to git. Setting a new computer is simple enough with the npm install command. So adding a gitignore before pushing might be a good idea.


The test setup is now lacking only the actual tests and the features to be tested. In the Gruntfile I defined the tests to be found from  the spec folder in the root of the project. So lets create the first test.


The feature that I want to implement for this project is a simple email input field and a send button that will verify the mail-address before sending it to the imaginary server. First test I'm going to write is verification of different kinds of email input to make sure that the checkup function is working.

[link to the test file]

Now that we have the tests that should fail and pass we can move on to implementing the feature itself. THis part of the  testing process does now differ any from the normal testing process for any website. THe only slight difference is that we
might be running the tests against an emulator or an actual android device, depending what is plugged in or configured ito the grutfile.

Before we can actually run the test should build the application. Now that the






































