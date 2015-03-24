Testing in hybrid mobile projects with Cordova and Appium

The reason behind testing is clear for all. How to accomplish that is completely another matter. For typical websites there are many
different options. One of the popular ones being Mocha and Chai as a combination. For native applications both for Android and
iOs different freameworks can also be found. When a project is a combination in both, things get a little bit tricky. If the
project uses fully the capabilities of Cordova, the testing seases to be simpel anymore. THe purely html, css and javascript
sides of the project can be nicely tested with the help of libraries jshint, mocha and chai. These give us a good foundation to
build our JS testing on.

When we are adding the cordova in to the mix, we need to add a frameowork to handle that, in this case I chose Appium.
