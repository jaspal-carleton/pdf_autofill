/**
 * Module dependencies
 */
const HashMap = require('hashmap');

// Helpers
const { createLicensePdf } = require('../helpers/pdf');

/**
 * Setup in-memory database
 */
// let doctorDB = new HashMap();
// let pdfDB = new HashMap();

/**
 * @description Create new pdf
 * @param {String} first_name 
 * @param {String} last_name 
 * @param {String} gender 
 * @param {String} province 
 * @param {Date} birth_date 
 * @returns {Object}
 */
async function createPdf(
    first_name,
    last_name,
    gender,
    province,
    birth_date) {
    try {
        const pdfName = await createLicensePdf(
            first_name,
            last_name,
            gender,
            province,
            birth_date);
        let obj = {
            status: 200,
            pdf_download_link: `http://localhost:5000/output/${pdfName}`
        };
        return obj;
    } catch (err) {
        throw {
            message: err
        };
    }
}


module.exports = {
    createPdf,
};