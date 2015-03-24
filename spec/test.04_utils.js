//TODO: UTILS STILL HAS UNTESTED FUNCTIONS
var chai = require("chai");
describe("utils Tests", function(){

    describe("window.sendData", function () {
        var task = 'basicTask';
        var paramsToSend = {"birthday_de":"2013, 2, 27","gender":"male","education_onliner":"Abitur","interests":["musicxxxxxxxx xxxxrthrt grhthrlskg sfmngs fgjuö hzrttert tertweert rgrtertrewtx"],"selecttest":"item1"};

        var pId = "8";
        var tId = "10";

        var jsonData = JSON.stringify({
            "method": 'Ey.' + task,
            "params": [paramsToSend,
                {
                    "pId": pId,
                    "tId": tId
                }]
        });

        it("Should get called", function (done) {
            var CB = function (err, res) {
                console.log(err, res);
                done();
            };
            this.browser.executeAsync("window.sendData(arguments[0], arguments[1], arguments[1])", [jsonData],  CB)
        })
    });


    describe("window.sendData friendTask", function () {
        var task = 'friendTask';
        var paramsToSend = {"to":"sus@bas.com,susa@bas.com,susan@bas.com"};
        var pId = "27";
        var tId = "28";

        var jsonData = JSON.stringify({
            "method": 'Ey.' + task,
            "params": [paramsToSend,
                {
                    "pId": pId,
                    "tId": tId
                }]
        });

        it("Should get called", function (done) {
            var CB = function (err, res) {
                console.log(err, res);
                done();
            };
            this.browser.executeAsync("window.sendData(arguments[0], arguments[1], arguments[1])", [jsonData],  CB)
        })
    });


    describe("window.sendData EMPTY paramstosend", function () {
        var task = 'friendTask';
        var paramsToSend = {};
        var pId = "27";
        var tId = "29";

        var jsonData = JSON.stringify({
            "method": 'Ey.' + task,
            "params": [paramsToSend,
                {
                    "pId": pId,
                    "tId": tId
                }]
        });

        it("Should get called", function (done) {
            var CB = function (err, res) {
                console.log(err, res);
                done();
            };
            this.browser.executeAsync("window.sendData(arguments[0], arguments[1], arguments[1])", [jsonData],  CB)
        });
    });


    describe("window.sendData UNDEFINED paramstosend", function () {
        var task = 'friendTask';
        var paramsToSend = undefined;
        var pId = "27";
        var tId = "29";

        var jsonData = JSON.stringify({
            "method": 'Ey.' + task,
            "params": [paramsToSend,
                {
                    "pId": pId,
                    "tId": tId
                }]
        });

        it("Should get called", function (done) {
            var CB = function (err, res) {
                console.log(err, res);
                done();
            };
            this.browser.executeAsync("window.sendData(arguments[0], arguments[1], arguments[1])", [jsonData],  CB)
        });
    });


    describe("window.sendData JSONDATA empty object", function () {
        var task = 'basicTask';
        var paramsToSend = {"birthday_de":"2013, 2, 27","gender":"male","education_onliner":"Abitur","interests":["musicxxxxxxxx xxxxrthrt grhthrlskg sfmngs fgjuö hzrttert tertweert rgrtertrewtx"],"selecttest":"item1"};
        var pId = "8";
        var tId = "10";

        var jsonData = JSON.stringify({

        });

        it("Should get called", function (done) {
            var CB = function (err, res) {
                console.log(err, res);
                done();
            };
            this.browser.executeAsync("window.sendData(arguments[0], arguments[1], arguments[1])", [jsonData],  CB)
        })
    });


    describe("window.sendData BASIC INFO sendSecretly", function () {
        var task = 'basicTask';
        var paramsToSend = {"birthday_de":"2013, 2, 27","gender":"male","education_onliner":"Abitur","interests":["musicxxxxxxxx xxxxrthrt grhthrlskg sfmngs fgjuö hzrttert tertweert rgrtertrewtx"],"selecttest":"item1"};
        var pId = "8";
        var tId = "10";

        var jsonData = JSON.stringify({
            "method": 'Ey.' + task,
            "params": [paramsToSend,
                {
                    "pId": pId,
                    "tId": tId
                }]
        });

        it("Should get called", function (done) {
            var CB = function (err, res) {
                console.log(err, res);
                done();
            };
            this.browser.executeAsync("window.sendSecretly(arguments[0], arguments[1], arguments[1])", [jsonData],  CB)
        })
    });



    describe("window.sendData friendTask sendSecretly", function () {
        var task = 'friendTask';
        var paramsToSend = {"to":"sus@bas.com,susa@bas.com,susan@bas.com"};
        var pId = "27";
        var tId = "28";

        var jsonData = JSON.stringify({
            "method": 'Ey.' + task,
            "params": [paramsToSend,
                {
                    "pId": pId,
                    "tId": tId
                }]
        });

        it("Should get called", function (done) {
            var CB = function (err, res) {
                console.log(err, res);
                done();
            };
            this.browser.executeAsync("window.sendSecretly(arguments[0], arguments[1], arguments[1])", [jsonData],  CB)
        })
    });


    describe("window.sendData friendTask2 sendSecretly", function () {
        var task = 'friendTask';
        var paramsToSend = {"to":"sus@wus.com,sis@dyn.com"};
        var pId = "27";
        var tId = "29";

        var jsonData = JSON.stringify({
            "method": 'Ey.' + task,
            "params": [paramsToSend,
                {
                    "pId": pId,
                    "tId": tId
                }]
        });

        it("Should get called", function (done) {
            var CB = function (err, res) {
                console.log(err, res);
                done();
            };
            this.browser.executeAsync("window.sendSilently(arguments[0], arguments[1], arguments[1])", [jsonData],  CB)
        });
    });





    describe("MCRM utils getFormattedDate DE", function(){
        it("Should get date Formatted to DE", function(done){
            //TODO: check results against correct timezone
            //getFormattedDate will transfer the unix timestamp to match the correct timezone
            //so test will fail in other timezones than EST
            //GMT would return 11/07/2014

            var timeDE = "07.11.2014";
            var time = 1415318400;

            this.browser.safeExecute("mcrm.utils.getFormattedDate(arguments[0], arguments[1])",[time, 'de_DE'],  function(err, res){
                setTimeout(function(){
                    console.log(res);
                    chai.expect(res).to.equal(timeDE);
                    done();
                }, 1000);
            })
        });
    });


    describe("MCRM utils getFormattedDate EN", function(){
        it("Should get date Formatted to EN", function(done){
            //TODO: check results against correct timezone
            //getFormattedDate will transfer the unix timestamp to match the correct timezone
            //so test will fail in other timezones than EST
            //GMT would return 11/07/2014
            var timeEN = "11/07/2014";
            var time = 1415318400;

            this.browser.safeExecute("mcrm.utils.getFormattedDate(arguments[0], arguments[1])", [time, 'en_EN'], function(err, res){
                setTimeout(function(){
                    console.log(res);
                    chai.expect(res).to.equal(timeEN);
                    done();
                }, 500);
            });
        });
    });

    describe("MCRM utils validateEmail", function(){

        it("expecting TRUE: good email to be good ", function(done){
            var mail = "mail@mail.com";
            var CB = function (err, res) {
                setTimeout(function(){
                    console.log(res);
                    chai.expect(res).to.equal(true);
                    done();
                }, 500);
            };
            this.browser.safeExecute("mcrm.utils.validateEmail(arguments[0])", [mail],  CB);
        });

        it("expecting TRUE: good email to be good ", function(done){
            var mail = "susanna@basilicom.de";
            var CB = function (err, res) {
                setTimeout(function(){
                    console.log(res);
                    chai.expect(res).to.equal(true);
                    done();
                }, 500);
            };
            this.browser.safeExecute("mcrm.utils.validateEmail(arguments[0])", ["susanna@basilicom.de"],  CB);
        });

        it("expecting TRUE:  special characters to pass" , function(done){
            var mail = "mail-mail-thing@mail.com";

            var CB = function (err, res) {
                setTimeout(function(){
                    console.log(res);
                    chai.expect(res).to.equal(true);
                    done();
                }, 500);
            };
            this.browser.safeExecute("mcrm.utils.validateEmail(arguments[0])", [mail],  CB);
        });

        it("expecting TRUE:  different end to pass", function(done){
            var mail = "mail.foobar@mailman.foobar";
            var CB = function (err, res) {
                setTimeout(function(){
                    console.log(res);
                    chai.expect(res).to.equal(true);
                    done();
                }, 500);
            };
            this.browser.safeExecute("mcrm.utils.validateEmail(arguments[0])", [mail],  CB);
        });

        it("expecting FALSE:  email with no @ to fail ", function(done){
            var mail = "mailmail.com";
            var CB = function (err, res) {
                setTimeout(function(){
                    console.log(res);
                    chai.expect(res).to.equal(false);
                    done();
                }, 500);
            };
            this.browser.safeExecute("mcrm.utils.validateEmail(arguments[0])", [mail],  CB);
        });

        it("expecting FALSE: email with no .something to fail ", function(done){
            var mail = "mail@mailcom";
            var CB = function (err, res) {
                setTimeout(function(){
                    console.log(res);
                    chai.expect(res).to.equal(false);
                    done();
                }, 500);
            };
            this.browser.safeExecute("mcrm.utils.validateEmail(arguments[0])", [mail],  CB);
        });

        it("expecting FALSE: space in email to fail ", function(done){
            var mail = "mail mail@mail.de";
            var CB = function (err, res) {
                setTimeout(function(){
                    console.log(res);
                    chai.expect(res).to.equal(false);
                    done();
                }, 500);
            };
            this.browser.safeExecute("mcrm.utils.validateEmail(arguments[0])", [mail],  CB);
        });
        //TODO: More of different email checking cases
    });


    //TODO: get a real path to a pixel in the device, an external link wont work
/*

    describe("MCRM utils getBase64 is there a response", function () {

        var url = "http://upload.wikimedia.org/wikipedia/en/4/45/One_black_Pixel.png";
        it("Should get called and answered", function (done) {
            var CB = function (err, res) {
                console.log(err, res);
                done();
            };
            this.browser.executeAsync("window.resolveLocalFileSystemURI(arguments[0], arguments[1])", [url],  CB)
        })
    });




    describe("window.sendData sendSecretly  COPY REALLY A BASE64 ", function () {


        var jsonData = 'http://upload.wikimedia.org/wikipedia/en/4/45/One_black_Pixel.png';

        it("Should get called", function (done) {
            var CB = function (err, res) {
                console.log(err, res);
                done();
            };
            this.browser.executeAsync("mcrm.utils.getBase64(arguments[0], arguments[1])", [jsonData],  CB)
        })
    });




//getBase64
    describe("MCRM utils getBase64", function(){


        it("Should getbase64 with data: start", function(done){
            var url = "http://upload.wikimedia.org/wikipedia/en/4/45/One_black_Pixel.png";
            var base64WithData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==";

            var CB = function (err, res) {
                setTimeout(function(){
                    console.log(err, res);
                    chai.expect(res).to.equal(base64WithData);
                    done();
                }, 500);

            };
            this.browser.executeAsync("mcrm.utils.getBase64(arguments[0], arguments[1])", [url],  CB)

        });

        //TODO: We dont have an image

    });
*/


});







/*






 //leadingZeros
 describe("MCRM utils leadingZeros", function(){

 it("Should get correct amount of zeroes in single digit number", function(){
 var num = 1;
 var zeros = 2;
 var result ="01";
 chai.expect(mcrm.utils.leadingZeros(num, zeros)).to.equal(result);
 });
 it("Should get correct amount of zeroes in double digit", function(){
 var num = 11;
 var zeros = 2;
 var result ="11";
 chai.expect(mcrm.utils.leadingZeros(num, zeros)).to.equal(result);
 });
 it("Should get false amount of zeroes", function(){
 var num = 1;
 var zeros = 0;
 var result ="01";
 chai.expect(mcrm.utils.leadingZeros(num, zeros)).to.not.equal(result);
 });

 });

 //formatDate
 describe("MCRM utils formatDate", function(){

 it("Should get formatDate", function(){
 var dateExpected = "07.11.2014";
 var date = new Date("November 7, 2014");
 chai.expect(mcrm.utils.formatDate(date)).to.equal(dateExpected);
 });
 it("Should get formatDate with lical ", function(){
 var dateExpected = "07.11.2014";
 //note, the date is interpreted depending on the browser settings
 var date = new Date("07.11.2014");
 chai.expect(mcrm.utils.formatDate(date)).to.not.equal(dateExpected);
 });


 });

 //getLanguageLink
 describe("MCRM utils getLanguageLink", function(){

 it("Should get correct getLanguageLink", function(){
 //Default language is DE
 var link = mcrm.config.faqLink;
 chai.expect(mcrm.utils.getLanguageLink(link)).to.equal("http://mcrm-solutions.com/faq-de.html");
 });
 it("Should get not get correct LanguageLink", function(){
 //Default language is DE
 var link = mcrm.config.faqLink;
 chai.expect(mcrm.utils.getLanguageLink(link)).not.to.equal("http://mcrm-solutions.com/faq-en.html");
 });



 });
 */
