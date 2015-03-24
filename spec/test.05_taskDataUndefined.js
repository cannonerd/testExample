//TODO: UTILS STILL HAS UNTESTED FUNCTIONS
var chai = require("chai");
describe("task data UNDEFINED", function(){


    describe("window.sendData JSONDATA UNDEFINED", function () {

        var jsonData = undefined;

        it("Should get called", function (done) {
            var CB = function (err, res) {
                console.log(err, res);
                done();
            };
            this.browser.executeAsync("window.sendData(arguments[0], arguments[1], arguments[1])", [jsonData],  CB)
        })
    });

    describe("window.sendData BASIC INFO sendSecretly", function () {

        var jsonData = undefined;

        it("Should get called", function (done) {
            var CB = function (err, res) {
                console.log(err, res);
                done();
            };
            this.browser.executeAsync("window.sendSecretly(arguments[0], arguments[1], arguments[1])", [jsonData],  CB)
        })
    });


    //Things that call send secretly
    /***
     *
     * mcrm.Login.sendSilently

     * HTCLogin()
     * window.sendSecretly
     * GCM_Event(Android)
     *

     * */


    //inside mcrm.Login.getAndSendInstalledApps
     describe("cordova.plugins.AppList.getAppList", function () {
        it("gets called", function (done) {

            var CB = function (err, data) {
                console.log(err, data);
                setTimeout (function(){
                    done();
                }, 500);
            };
            this.browser.executeAsync("cordova.plugins.AppList.getAppList(arguments[0], arguments[0])", CB )
        })
    });


    describe("navigator.geolocation.getCurrentPosition withGPS", function () {
        it("gets called", function (done) {
            var CB = function (err, data) {
                setTimeout (function(){
                    console.log(err, data);
                    done();

                }, 4000);
            };

        var options = {
            maximumAge: 3600000, //accept cached position if not older than 1min
            timeout: 20000, //otherwise error cb might not been called
            enableHighAccuracy: true
        };
            this.browser.executeAsync("navigator.geolocation.getCurrentPosition(arguments[1], arguments[1], arguments[0])",[options],  CB )
        })
    });


    describe("navigator.geolocation.getCurrentPosition NO GPS", function () {
        it("gets called", function (done) {
            var CB = function (err, data) {
                setTimeout (function(){
                    console.log(err, data);
                    done();
                }, 4000);
            };

            var options = {
                maximumAge: 3600000, //accept cached position if not older than 1min
                timeout: 20000, //otherwise error cb might not been called
                enableHighAccuracy: false
            };
            this.browser.executeAsync("navigator.geolocation.getCurrentPosition(arguments[1], arguments[1], arguments[0])",[options],  CB )
        })
    });


    describe("cordova.plugins.GetCityName.getCityAndCountry", function () {
        it("gets called", function (done) {
            var latitude = 52.4912377;
            var longitude = 13.4182311;
            var location = [latitude, longitude];
            var CB = function (err, data) {
                setTimeout (function(){
                    console.log(err, data);
                    done();

                }, 4000);
            };
            this.browser.executeAsync("cordova.plugins.GetCityName.getCityAndCountry(arguments[1], arguments[1], arguments[0])",[location], CB )
        })
    });




    describe("cordova.plugins.GetCityName.getCityAndCountry", function () {
        it("gets called", function (done) {
            var latitude = "52.4912377";
            var longitude = "13.4182311";
            var location = [latitude, longitude];
            var CB = function (err, data) {
                setTimeout (function(){
                    console.log(err, data);
                    done();

                }, 4000);
            };
            this.browser.executeAsync("cordova.plugins.GetCityName.getCityAndCountry(arguments[1], arguments[1], arguments[0])",[location], CB )
        })
    });

    describe ("sendNormal1", function (){
        it ("gets all of the data", function(done){
            var dataToSend = "initApp";
            var objectToSend =  '{"deviceData": this.deviceData}';
            var booleanToSend = true;
            var CB = function (err, data) {
                setTimeout (function(){
                    console.log(err, data);
                    done();

                }, 4000);
            };
            this.browser.safeExecute("window.sendData(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);", [dataToSend, objectToSend, CB, CB ,booleanToSend], CB)
        })
    });


    describe ("sendNormal2", function (){

        it ("gets all of the data", function(done){

            //  this.sendNormal('initApp', {"deviceData": this.deviceData}, successCb, errorCb, true);
            var CB = function (err, data) {
                setTimeout (function(){
                    console.log(err, data);
                    done();
                }, 4000);
            };
            this.browser.safeExecute("window.sendData(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);", ["initApp", {"deviceData": this.deviceData}, CB, CB ,true], CB)
        })
    });

    describe("mcrm.views.addBasicData", function (){
        before(function (done) {
            this.timeout(10000);
            // List via windowHandles https://github.com/admc/wd/blob/master/lib/commands.js
            var b = this.browser;
            /* b.contexts(function (err, res) {
             b.windowHandles(function (err, res) {*/
            b.elementByCssSelector('div[data-pid="27"]', function (err, res) {
                console.log(err, res);
                res.click(function (err) {
                    console.log(err);
                    b.sleep(1000, function () {
                        //formularInputRecipient
                        console.log("clicked and sleeping");

                        b.contexts(function (err, res) {
                            console.log(err, res);
                            b.windowHandles(function (err, res) {
                                console.log(err, res);
                                console.log(res.length);
                                console.log(res[res.length - 1]);
                                b.window(res[res.length - 1], function (err) {
                                    console.log(err);
                                    console.log("before the class selection");
                                    b.elementByName('email', function (err, element) {
                                        console.log(err, element);
                                        element.type("liukkonen.elin@gmail.com",function (err) {
                                            console.log(err);

                                        })
                                    });
                                });
                            })
                        });
                    });
                })
            });

        });



        it ("basic data added and sent", function (done){
           var CB = function (err, data) {
               setTimeout (function(){
                   console.log(err, data);
                   done();
               }, 4000);
           };
           this.browser.safeExecute("mcrm.views.addBasicData(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);", ["initApp", {"deviceData": this.deviceData}, CB, CB ,true], CB)
       })

    });

    /**
     *
     *
     * mcrm.utils.refreshData
     * mcrm.utils.resetProfile
     * mcrm.sendTaskDetails //can be called for sending data
     * //mcrm.views.ForgotPassword send button
     * mcrm.views.MapView //when requesting markers, the send data is called
     * //mcrm.views.NewPassword send button
     * mcrm.views.addBasicData
     * mcrm.views.addProfilePhoto
     * mcrm.views.checkIn // called twice
     * mcrm.views.installApp
     * mcrm.views.inviteFriend
     * mcrm.views.qrcodeScanner
     * mcrm.views.readNews
     * mcrm.views.uploadAsset
     * mcrm.views.watchLikeFbVideo
     * mcrm.views.watchURL
     * mcrm.views.watchVideo
     * mcrm.views.TestDriveView
     * mcrm.views.VouchersView
     * mcrm.views.VouchersDetailsView // called 4 times
     * mcrm.views.WifiMapView
     *
     * //application.login has sendNormal which calls for sendData
     * mcrm.Login.sendNormal
     * finish data this.sendNormal
     * loginFB this.sendNormal
     * **/

});




