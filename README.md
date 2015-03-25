Testing in hybrid mobile projects with Cordova and Appium

The reason behind testing is clear for all. How to accomplish that is completely another matter. For typical websites there are many
different options. One of the popular ones being Mocha and Chai as a combination. For native applications both for Android and
iOs different freameworks can also be found. When a project is a combination in both, things get a little bit tricky. If the
project uses fully the capabilities of Cordova, the testing seases to be simpel anymore. THe purely html, css and javascript
sides of the project can be nicely tested with the help of libraries jshint, mocha and chai. These give us a good foundation to
build our JS testing on.

When we are adding the cordova in to the mix, we need to add a frameowork to handle that, in this case I chose Appium. There is near to no
documentation in testing cordova applications, which leads me to wonder weather or not the apps are being tested.

SO that I can be able to build a versatile and as fully automated as possible test environment, I'm using Grunt as my foundation.
Grunt is a JavaScript task runner. With the help of Grunt I can easily handle all the different kind of test scenarions I will encounter.
From testing locally for just one feature, or setting up a full windowless server and runnin all the tests by kicking up a bunch or Emulators
or plugging in  a real device to the server you just happen to runt underneath your desk.

Grunt being the foundation, the testing is based combination of Appium, mocha, chai and phantomjs. Js hint being there at the bottom to scream
at me when I have been a sloppy twat.

But enought of the background and into practise. I will create an small cordova application running on Android to give you the fundamentals
on programmind keeping the tests in mind.

So first we need to create a Cordova application.

This can easily be done by following the https://cordova.apache.org/docs/en/4.0.0/guide_cli_index.md.html documentation.

When we have the project, the important adds to be made are the package.json file to keep track of all the libraries we are using in this project
the Gruntfile.js to be able to run all the necessary tasks. And then the speck file containing all the testes to be ran.

When a project has a package.json file in it, all the necessary librares can be installed with a simple npm install.

So to get this project up an runniing lets create the package.json in the root of the project.

The first thing we need is the name and the author and the minimum set of libraries which for us are:


  "devDependencies": {
    "chai": "^2.0.0",
    "grunt": "^0.4.5",
    "grunt-contrib-jshint": "^0.11.0",
    "grunt-mocha-phantomjs": "^0.6.0",
    "grunt-mocha-appium": "^0.4.0"
  }

Later in the project we will add few other dependencies for the project.



To be able to run the tests against a virtual device, Android SDK is necessary. First download the androidSDK and then  correct the paths. Make sure to have java on your system
Android won't work without.


open bashrc with your favourite editor
gedit ~/.bashrc
#JAVA_HOME
export JAVA_HOME=/home/cannonerd/LibrariesForLinux/jdk1.8.0_31

export ANDROID_HOME=[path to your extracted android sdk]android-sdk-linux
PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools


1) Check in System Settings -> Details, whether your Ubuntu is 32-bit or 64-bit

2) If your Ubuntu is a 32-bit OS then run this sudo apt-get install libgl1-mesa-dev In case of 64-bit OS run this sudo apt-get install ia32-libs

3) run this sudo apt-get install openjdk-6-jdk or better this sudo apt-get install openjdk-7-jdk

4) Download SDK platform tools from here http://developer.android.com/sdk/index.html and extract

9) try run this cd ~/android-sdk-linux/tools then this ./android. If you did all right you should see Android SDK Manager

10) run this sudo gedit ~/.bashrc in opened editor add this in very top

#AndroidDev PATH

export ANDROID_HOME=[path to your extracted android sdk]android-sdk-linux
PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools



when you have installed all the necessary android sDK parts it is time to create the emulator.

./android list targets
will give you a list of possible android targets.


To create an android virtual emulator (create once use later with the name)
example:
android create avd -n kitkat -t 6

spec:
android create avd n <name> -t <targetID> [<option> <value>]

Start emulator (will be done from GruntFile):
(for gruntfile we need a list of names of the emulators we run [naming convention: official release names matching API level])

emulator -avd kitkat -no-skin -no-audio -no-window


while installing the android SDK, be sure to install the android command globally so the emulator can be started anywhere. 
If you don't want to do this, be sure to make the according changes to the path in the Grunfile which is launching your emulator for you.


So lets create the hello world with testing with cordova. Right now I'm just creating it for Android, but iOs can be brought in also.

cordova create com.hello.world helloWorld
cordova add platform android



Now we have a project with a structure like this:

platforms
plugins 
www 
randomfiles


so, to get the testing running we add the package.json and Gruntfile.js to the root of the project.

After the package.json has been created to have the project name, developer and devdependencies it is time to install the minimun
amount of dependencies we need, in our case that being 

  "devDependencies": {
    "chai": "^2.0.0",
    "grunt": "^0.4.5",
    "grunt-contrib-jshint": "^0.11.0",
    "grunt-mocha-phantomjs": "^0.6.0",
    "grunt-mocha-appium": "^0.4.0"
  }
  
  
  so the full package.json should look something like this


{
  "name": "Basilicom tests",
  "version": "0.1.0",
  "description": "Testing made easy and useful",

  "devDependencies": {
    "chai": "^2.0.0",
    "grunt": "^0.4.5",
    "grunt-contrib-jshint": "^0.11.0",
    "grunt-mocha-phantomjs": "^0.6.0",
    "grunt-mocha-appium": "^0.4.0"
  },
  "scripts": {
    "test": "grunt test"
  },
  "author": "Susanna Huhtanen, Basilicom gmbh",
  "license": "MIT"
}


in the scripts section the run command for the tests is defined. For future implementations this can be what Travis or TEamcity will use.


now over to the Gruntfile.js. If you are new to Grunt, go over to ... to get a better overview, but basically we bneed to initialize
the grunt setup, tell the different tasks what to do

As first, we need to form a link between the Gruntfile and the package.json
then we need to tell the jshint, where the javascript files for this project are found


With appium we get a bit trickier setup. And the Appium documentation does not actually help at this point. 

the firs batch of setting up the Appium is the options

    // Mocha options
                reporter: 'spec',
                timeout: 6000,
                // Toggles wd's promises API, default:false
                usePromises: true,
                useChaining: true
            },
            
            
the timeout is the general set timeout for things to timeout sou you would not get stuck into a faulty test forever.
The problem being thought that the timeout can be later set to various lengths. THe timeouts in Appium tests work in 3 different onion like 
layers, so keeping track of which timeout is applied to your different tests at different points is important. HERE BE more of the different 
timeour layers. The uses promising feature of appium I haven't got working yet to my complemete puzzlement, so just leave it there and wait 
for an update for this blogpost when I have figured it out.

the next steps are the platform dependent settins. So iOs would be added in the same manner as Android

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


so the important parts are the scr, where your tests are and in the app, the location for the actual application built by cordova build
android. So the full Gruntfile would look something like this.



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


Now that the Gruntfile and package.json anre correctly set up, it is time to run npm install from the root of the project


The nmp install will install the necessary packages. Sometimes npm hangs and you need to manually install or upgrade some
of the dependencies, but that is simple enough.

Now we have a new folder in the root of the project which is called node_modules. DO NOT push this folder to git. Setting a new computer 
is simple enought with the npm install command


THE test setup is now lacking only the actual tests and the features to be tested. In the gruntfile I defined the tests to be found from  the spec folder in the
root of the project. So lets create the first test.


The feature that I want to implement for this project is a simple email input field and a send button that will verify the email-address
before sending it to the imaginary server. First test I'm going to write is verification of different kinds of email input to make sure that
the checkup function is working.

copy paste the test for the email in here

Now that we have the tests that should fail and pass we can move on to implementing the feature itself. THis part of the 
testing process does now differ any from the normal testing process for any website. THe only slight difference is that we 
might be running the tests against an emulator or an actual android device, depending what is plugged in or configured ito the 
grutfile. 







































