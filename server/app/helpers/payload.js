/**
 * Module dependencies
 */
const moment = require('moment-timezone');

/**
 * @description validate name
 * @param {String} nameString - guest name
 * @returns {Boolean}
 */
function validateName(nameString) {
    return String(nameString).length > 1 ? true : false;
}

/**
 * @description validate gender
 * @param {String} genderString - gender
 * @returns {Boolean}
 */
function validateGender(genderString) {
    genderString = String(genderString).toLowerCase();
    return (genderString === "male" ||  genderString === "female") ? true : false;
}

/**
 * @description validate province
 * @param {String} provinceString - province
 * @returns {Boolean}
 */
 function validateProvince(provinceString) {
    provinceString = String(provinceString).toLowerCase();
    return (provinceString === "ca" ||  provinceString === "ny") ? true : false;
}

/**
 * @description validate date format
 * @param {String} dateString - date
 * @returns {Boolean}
 */
function validateDateFormat(dateString) {
    return moment(dateString, 'YYYY-MM-DD', true).isValid();
}

/**
* Export modules
*/
module.exports = {
    validateName,
    validateGender,
    validateProvince,
    validateDateFormat,
};