Testing in hybrid mobile projects with Cordova and Appium
============


The reasoning why to do tests is clear for all. How to implement tests is a completely other matter. For typical websites there are many different options. One of the popular frameworks being [Mocha] (http://mochajs.org/) with the help of the asstertion library [Chai] (http://chaijs.com/). For native applications both for Android and iOs different frameworks can also be found. When a project is a hybrid app, things get a little bit tricky. Trying to ease out the trickiness we have a test automation framework [Appium] (http://appium.io/) .

I'm using [Grunt] (http://gruntjs.com/) as my foundation. Grunt is a JavaScript task runner. With the help of Grunt I can easily handle all the different kind of test scenarios I will encounter. From testing locally for just one feature, or setting up a full windowless server and running all the tests by kicking up a bunch or Emulators or plugging in a real device to the server you just happen to run underneath your desk.

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


Package.json and Gruntfile.js
------------

Add the [package.json](https://docs.npmjs.com/files/package.json) and Gruntfile.js to the root of the project. In the package.json we define the name, version, dependencies and scripts that define our project.

~~~
{
  "name": "Blueprint",
  "version": "0.1.0",
  "description": "tests",
  "dependencies": {},
  "devDependencies": {
    "chai": "^2.0.0",
    "grunt": "^0.4.5",
    "grunt-contrib-jshint": "^0.11.0",
    "grunt-bg-shell": "^2.3.1",
    "grunt-mocha-appium": "^0.4.0",
    "json-stringify-safe": "^5.0.0"
  },
  "scripts": {
    "test": "grunt test"
  },
  "author": "Susanna Huhtanen, Basilicom gmbh",
  "license": "MIT"
}

~~~



Now over to the Gruntfile.js.  As first, we need to form a link between the Gruntfile and the package.json. Jshint, also needs a path too find some reason to whine about form.

~~~
pkg: grunt.file.readJSON('package.json'),
jshint: { all: ['src/*.js'] },
~~~

With Appium we have a bit trickier setup, and the Appium documentation does not actually help at this point that much.

The first things to setu up in Appium are the options

~~~
// Mocha-appium options
    reporter: 'spec',
    timeout: 6000,
    // Toggles wd's promises API, default:false
    usePromises: true,
    useChaining: true
},
~~~
            
The timeout is set to prevent the tests running forever. The thing to know, is that this general timeout can be overwritten in the tests. The timeouts in Appium work in 3 different layers, so keeping track of which timeout is applied is important. The usePromises feature of Appium I haven't got working yet to my complete puzzlement, so just leave it there and wait for an update to this blogpost when I have figured it out.

The next steps are the platform dependent settings. iOs would be added in the same manner as Android.

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


For automated starting of the emulator, I use the [bgShell](https://github.com/rma4ok/grunt-bg-shell) from Kiryl Yermakou.


~~~
  bgShell: {
            command: {
                bg: true,
                execOpts: {
                    maxBuffer: false
                },
                cmd: 'emulator -avd kitkat'
            }
        }
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

~~~
$ npm install
~~~

The nmp install will install the necessary packages in the node_modules folder it creates.

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

Now we have a new folder in the root of the project which is called node_modules. DO NOT push this folder to git. Setting up a new instance of the project is simple enough with the npm install command. Adding a gitignore before pushing the changes to git might be a good idea.


The test setup is now lacking only the actual tests and the features to be tested. In the Gruntfile we defined the tests to be found from the spec folder in the root of the project. So lets create the spec folder and the first test.


The feature that I want to implement for this project is a simple email input field and a send button that will verify the mail-address before sending it to the imaginary server. First test I'm going to write is verification of different kinds of email input to make sure that the checkup function is working. And as a counterpart for the test I will write the function to be tested. For the first run the function returns null. Check the example project for more details.

~~~
describe("Validate email Address", function(){

    it("expecting TRUE: good email to be good ", function(done){
        var mail = "mail@mail.com";
        var CB = function (err, res) {
            setTimeout(function(){
                console.log(res);
                chai.expect(res).to.equal(true);
                done();
            }, 500);
        };
        this.browser.safeExecute("validateEmail(arguments[0])", [mail],  CB);
    });


 });
~~~


at this point we can run the tests for the first time. Just simply type in grunt test as defined in the script section of the Gruntfile. And as there is just the function defined, the tests should fail.


~~~
$ grunt test
Running "bgShell:command" (bgShell) task

Running "jshint:all" (jshint) task
>> 2 files lint free.

Running "mochaAppium:android" (mochaAppium) task
Starting Appium with args: --port 42009
Appium Running

Driving the web on session: 8ae936af-5e8c-4cdc-90fb-6df53711d88e



  Validate email Address
undefined
    1) expecting TRUE: good email to be good
undefined
    2) expecting TRUE: good email to be good
undefined
    3) expecting TRUE:  special characters to pass
undefined
    4) expecting TRUE:  different end to pass
undefined
    5) expecting FALSE:  email with no @ to fail
undefined
    6) expecting FALSE: email with no .something to fail
undefined
    7) expecting FALSE: space in email to fail


  0 passing (4s)
  7 failing


~~~


Now we have a fully working test setup with a bunch of failing tests and the buildup for a fully tested application can begin.



The full list of commands for testing can be found in the documentation of [node.js Webdriver client WD](https://github.com/admc/wd/blob/f49065fa8ff91411f70972f149e90b7f97f4cd39/lib/commands.js) and
[the ui interaction docs](https://github.com/admc/wd/blob/1038c33b0abbe8329d81c9bb6bb62e3df3b440fa/doc/api.md)


































