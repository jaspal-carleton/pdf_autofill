require("rootpath")();

/**
 * Test libraries 
 */
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;

const servicePdf = require("app/services/pdf");

/**
 * Test suite for booking services
 */
describe("Test Suite - PDF Service Functions", function () {
    let bookingId = "";

    describe("Create PDF", function () {
        it("should create new pdf", function () {
            const result = servicePdf.createPdf(
                "John",
                "Doe",
                "Male",
                "ca",
                "1989-01-12"
            );
            result.then( res => {
                expect(res).to.have.property('pdf_download_link');
            })
        });
    });
});
