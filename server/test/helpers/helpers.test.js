require("rootpath")();

/**
 * Test libraries 
 */
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;

const helperHash = require("app/helpers/hash");
const helperParams = require("app/helpers/params");
const helperPayload = require("app/helpers/payload");
const helperResponse = require("app/helpers/response");

/**
 * Test suite for helper functions
 */
describe("Test Suite - Helper Functions", function () {

    describe("Payload Helper", function () {

        it("validates name", function () {
            const result = helperPayload.validateName("john");
            expect(result).to.be.true;
        });

        it("validates gender", function () {
            const result = helperPayload.validateGender("male");
            expect(result).to.be.true;
        });

        it("validates province", function () {
            const result = helperPayload.validateProvince("ca");
            expect(result).to.be.true;
        });

        it("validates date format", function () {
            const result = helperPayload.validateDateFormat("2021-09-10");
            expect(result).to.be.true;
        });

    });

    describe("Response Helper", function () {
        it("generate error stack", function () {
            const result = helperResponse.generateError(404, "Not found");
            assert.equal(result, "NotFoundError: Not found")
        });

        it("generate success stack", function () {
            const result = helperResponse.generateSuccess("test data");
            expect(result).to.deep.equal({"success":true, "data":"test data"});
        });
    });
});
