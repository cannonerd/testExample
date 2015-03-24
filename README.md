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




