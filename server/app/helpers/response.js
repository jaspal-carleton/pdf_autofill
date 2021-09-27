/**
 * Module dependencies
 */
const createError = require('http-errors');

/**
 * @description generate error response
 * @param {Number} code - HTTP error code
 * @param {String} message - error message
 * @returns {Object} error object
 */
function generateError(code, message) {
    const err = createError(code, message);
    return err;
}

/**
 * @description generate success response
 * @param {Object} data - data object
 * @returns {Object} response object
 */
function generateSuccess(data) {
    const obj = {
        success: true,
        data: data,
    };
    return obj;
}

/**
* Export modules
*/
module.exports = {
    generateError,
    generateSuccess,
};