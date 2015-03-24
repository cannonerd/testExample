var chai = require("chai");
describe("mcrm application PRElogin process Tests", function(){
    //get the correct scope before testing

    before(function (done) {
        // List via windowHandles https://github.com/admc/wd/blob/master/lib/commands.js
        var b = this.browser;
        b.contexts(function (err, res) {
            b.context(res[res.length-1],function (err, handle) {
                b.setAsyncScriptTimeout(2000, done);
            });
        });
    });

    describe("Title", function () {
        it("Should be found", function (done) {
            var b = this.browser;
            b.title(function (err, title) {
                console.log(err, title)
                chai.expect(title).to.equal("Ey-dev mcrm");
                done();
            });
        })
    });

    describe("Callback", function () {
        it("Should get called", function (done) {
            this.browser.executeAsync("setTimeout(arguments[arguments.length - 1], 10)", function (err, stat) {
                chai.expect(err).to.be.a('null')
                console.log(err, stat);
                done();
            })
        })
    });

    //TODO: TEST if we have cordova deviceready


    //preInitMcc, calls initapp if mcrm.config.mccRouting is false
    //init app initiates tue ui for the first time. Now we have views, router, and backbone
    //Get Device Data & getSystemLanguage

    //getLocaleName
    describe("MCRM getLocaleName", function(){

        it("Should get getLocaleName", function(done){
            if (typeof window !== "undefined" && window.mochaPhantomJS) {
                return done();
            }

            var CB = function (err, res) {
                console.log(err, res, res.value);

//                chai.expect(res.value).to.equal("en-US");
                chai.expect(res.value).to.equal("de-DE");
                done();
            };

            this.browser.executeAsync("navigator.globalization.getLocaleName(arguments[0], arguments[0])", CB)

        });

    });

    //getGeneralInfo
    describe("MCRM getGeneralInfo", function(){

        it("Should get getGeneralInfo", function(done){
            if (typeof window !== "undefined" && window.mochaPhantomJS) {
                return done();
            }

            var CB = function (err, res) {
                console.log(err, res);
                chai.expect(res).to.be.an('object');
                done();
            };

            this.browser.executeAsync("cordova.plugins.generalInfo.getGeneralInfo(arguments[0], arguments[0])", CB)

        });
    });

});

/*
describe("mcrm application login process LOGIN NEEDED TESTING", function(){

    //TODO: Make the promises api work instead of this christmast tree of doom!
    before(function (done) {
        this.timeout(0);
        // List via windowHandles https://github.com/admc/wd/blob/master/lib/commands.js
        var b = this.browser;
        b.elementById('fbBtnClick', function (err, res) {
            res.click(function (err) {
                b.sleep(1000, function () {
                    b.contexts(function (err, res) {
                        b.windowHandles(function (err, res) {
                            b.window(res[res.length - 1], function (err) {
                                b.elementByName('email', function (err, element) {
                                    element.type("liukkonen.elin@gmail.com",function (err) {
                                        b.elementByName('pass', function (err, element) {
                                            element.type("elinanelimet",function (err) {
                                                b.elementByName("login", function(err, res){
                                                    res.click(function (err) {
                                                        b.sleep(1000, function () {
                                                            b.windowHandles(function (err, res) {
                                                                b.window(res[res.length - 1], function (err) {
                                                                    b.elementByName('__CONFIRM__', function (err, element) {
                                                                        element.click(function (err) {
                                                                            b.sleep(20000, function () {
                                                                                b.windowHandles(function (err, res) {
                                                                                    b.window(res[0], function (err) {
                                                                                        done();
                                                                                    })
                                                                                })
                                                                            })

                                                                        })
                                                                    })

                                                                })
                                                            });
                                                        })

                                                    })
                                                })

                                            })
                                        });

                                    });

                                });

                            })

                        })
                    });
                });
            })
        });


        *//*
         .click()
         .sleep(2000)
         .window('WEBVIEW_1')
         .title()
         .then(function (res) {
         console.log(res);
         })
         .elementsByTagName('input')
         .then(function (result) {
         console.log(result);
         result[0].type("hello")
         done();
         })
         .windowHandles()
         .then(function (res) {
         console.log(res);
         })

         b.url(function (err, element) {
         console.log(err, element);
         });


         *//*
    });
    *//*
     after(function (done) {
     this.browser.executeAsync("mcrm.Login.logout(); setTimeout(arguments[0], 100)", done);
     })*//*


    describe("MCRM facebookConnectPlugin.getLoginStatus", function(){

        it("Should get facebookConnectPlugin.getLoginStatus", function(done){
            if (typeof window !== "undefined" && window.mochaPhantomJS) {
                return done();
            }

            var CB = function (err, res) {
                console.log(err, res);
                console.log(res.status);
                chai.expect(res.status).to.not.equal("unknown");
                done();
            };

            this.browser.executeAsync("facebookConnectPlugin.getLoginStatus(arguments[0])", CB)

        });

        it("Should get facebookConnectPlugin.getLoginStatus", function(done){
            if (typeof window !== "undefined" && window.mochaPhantomJS) {
                return done();
            }

            var CB = function (err, res) {
                console.log(err, res);
                console.log(res.status);
                chai.expect(res.status).to.equal("connected");


                done();
            };

            this.browser.executeAsync("facebookConnectPlugin.getLoginStatus(arguments[0])", CB)

        });


        it("Should get facebookConnectPlugin.getLoginStatus match authtoken", function(done){
            this.timeout(4000);
            if (typeof window !== "undefined" && window.mochaPhantomJS) {
                return done();
            }
            //Needs to be changed often
            var CB = function (err, res) {
                console.log(err, res);
                console.log(res.status);
                if(res.status === "connected"){
                    setTimeout(function(){
                        chai.expect(res.authResponse.accessToken).to.be.a('string');
                        done();
                    }, 3000);
                }

            };
            this.browser.executeAsync("facebookConnectPlugin.getLoginStatus(arguments[0])", CB)

        });

    });
});*/




//HEADERIT tulee payload ei onko se ajax POST?

//jquery ajax on korkeat tason pyyntö

//








/*
 //getMCC NOT HAPPENING ON MCRM Y DEV
 describe("MCRM get MCC", function(){

 it("Should get getMcc", function(done){
 if (typeof window !== "undefined" && window.mochaPhantomJS) {
 return done();
 }
 var CB = function (err, res) {
 console.log(err, res);
 chai.expect(res).to.equal("310");
 done();
 };
 this.browser.executeAsync("cordova.plugins.generalInfo.getMcc(arguments[0])", CB)

 });


 it("Should get getMcc precheck cordova.file cacheDirectory", function(done){
 if (typeof window !== "undefined" && window.mochaPhantomJS) {
 return done();
 }

 var b = this.browser;
 b.window("WEBVIEW", function (err, w) {
 b.execute("cordova.file.cacheDirectory", function (err, result) {
 console.log(err, result);
 done();
 })
 })


 });


 it("Should get getMccTableTest TEST1", function(done){
 if (typeof window !== "undefined" && window.mochaPhantomJS) {
 return done();
 }
 var mccUS = "310";
 var cb = function (err, res) {
 console.log(err, res);
 chai.expect(res).to.equal("310");
 done();
 };

 this.browser.executeAsync("getMccTableTest(arguments[0], arguments[1])", [mccUS],  cb)

 });



 */


//NOT CALLED YET
/* browser.execute('funkkari(arguments[0])', ['foo'], function (err, val) { })*/


/*
 it("Should get getMcc precheck cordova.file.resolveLocalFileSystemURL", function(done){
 if (typeof window !== "undefined" && window.mochaPhantomJS) {
 return done();
 }
 //TODO: WHERE IS cordova.file.cacheDirectory defined?
 var cacheDirectory = null;
 var CB = function (err, res) {
 console.log(err, res);
 chai.expect(res).to.equal("310");
 done();
 };
 this.browser.execute("window.resolveLocalFileSystemURL(arguments[0], arguments[1])", [cacheDirectory],  CB)

 });


 });
 */


