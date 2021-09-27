/**
 * Module dependencies
 */
const uuid = require('uuid');

/**
 * @description generate universal unique id
 * @param {None}
 * @returns {String} - alphanumeric unique id
 */
function generateRandomUid() {
    return uuid.v4();
}

/**
 * Export modules
 */
module.exports = {
    generateRandomUid,
};