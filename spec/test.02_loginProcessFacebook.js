
var chai = require("chai");


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

    });



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
});