/**
 * Module dependencies
 */
const fs = require('fs');
const moment = require('moment-timezone');
const {
    PDFDocument,
    PageSizes,
    StandardFonts,
    rgb,
    degrees
} = require('pdf-lib');

const { generateRandomUid } = require('./hash');
const pdfSchema = require('../configs/pdfSchema');

/**
 * @description create pdf page
 * @param {Object} pdfDoc - pdf document object
 * @returns {Object}
 */
function createPdfPage(pdfDoc) {
    const page = pdfDoc.addPage(PageSizes.Letter);
    return page;
}

/**
 * @description create pdf
 * @param {Object} pdfDoc - pdf document object
 * @returns {Object}
 */
async function createLicensePdf(first_name, last_name, gender, province, birth_date) {
    try {
        const NAME_FORMAT = pdfSchema['province'][province]['name'];
        const GENDER_FORMAT = pdfSchema['province'][province]['gender'];
        const DOB_FORMAT = pdfSchema['province'][province]['dob'];
        const TEMPLATE_NAME = pdfSchema['province'][province]['template'];

        // Source
        const uint8Array = fs.readFileSync(`./template/${TEMPLATE_NAME}`);
        const pdfDoc = await PDFDocument.create()
        const srcDoc = await PDFDocument.load(uint8Array);
        const copiedPages = await pdfDoc.copyPages(srcDoc, [0])
        const [firstPage] = copiedPages;
        const startPage = pdfDoc.addPage(firstPage)

        // Write doctor details
        startPage.moveTo(260, 270);
        startPage.drawText(`${first_name}`, {
          size: 12,
          color: rgb(41 / 255, 170 / 255, 225 / 255),
        });
        startPage.moveTo(260, 235);
        startPage.drawText(`${last_name}`, {
          size: 12,
          color: rgb(41 / 255, 170 / 255, 225 / 255),
        });
        startPage.moveTo(260, 195);
        startPage.drawText(`${gender}`, {
          size: 12,
          color: rgb(41 / 255, 170 / 255, 225 / 255),
        });
        startPage.moveTo(260, 160);
        let dob = moment(birth_date, 'YYYY-MM-DD').format(DOB_FORMAT);
        startPage.drawText(`${dob}`, {
          size: 12,
          color: rgb(41 / 255, 170 / 255, 225 / 255),
        });

        // Save PDF
        let pdfBytes = await pdfDoc.saveAsBase64();
        const pdfBase64 = Buffer.from(pdfBytes, 'base64');
        const outputPdf = generateRandomUid() + '.pdf';
        fs.writeFileSync(`./output/${outputPdf}`, pdfBase64);
        return outputPdf;
    } catch (err) {
        throw {
            statusCode: 500,
            message: `Error saving pdf bytes: ${err}`,
        };
    }
    
}

module.exports = {
    createPdfPage,
    createLicensePdf,
};