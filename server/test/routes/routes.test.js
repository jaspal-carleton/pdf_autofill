require("rootpath")();

/**
 * Test libraries 
 */
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const assert = chai.assert;

// Configure chai
chai.use(chaiHttp);
chai.should();

/**
 * Test suite for router
 */
describe("Test Suite - Router", function () {
    let bookingId = "";

    describe("POST /api/v1/pdf", function () {
        it("should create new pdf", function (done) {
            chai.request('http://localhost:5000')
                .post('/api/v1/pdf')
                .send({
                    "first_name": "John",
                    "last_name": "Doe",
                    "gender": "Male",
                    "province": "CA",
                    "birth_date": "1989-01-01"
                })
                .then(function (res) {
                    expect(res).to.have.status(200);
                    done();
                })
                .catch(function (err) {
                    throw err;
                });
        });
    });
});
