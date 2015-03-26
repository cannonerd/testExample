var chai = require("chai");
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

    it("expecting TRUE: good email to be good ", function(done){
        var mail = "susanna@basilicom.de";
        var CB = function (err, res) {
            setTimeout(function(){
                console.log(res);
                chai.expect(res).to.equal(true);
                done();
            }, 500);
        };
        this.browser.safeExecute("validateEmail(arguments[0])", ["susanna@basilicom.de"],  CB);
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
        this.browser.safeExecute("validateEmail(arguments[0])", [mail],  CB);
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
        this.browser.safeExecute("validateEmail(arguments[0])", [mail],  CB);
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
        this.browser.safeExecute("validateEmail(arguments[0])", [mail],  CB);
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
        this.browser.safeExecute("validateEmail(arguments[0])", [mail],  CB);
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
        this.browser.safeExecute("validateEmail(arguments[0])", [mail],  CB);
    });

});
