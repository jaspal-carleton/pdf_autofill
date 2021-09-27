/**
 * @description read the config file attributes
 * @param {String} path - config file path
 * @returns {Object} config file key-value pair
 */
function getConfigParams(path) {
    let defaultConfigs = require(`${path}/default`);
    return defaultConfigs;
}

/**
 * @description read the pdf schema file attributes
 * @param {String} path - schema file path
 * @returns {Object} schema file key-value pair
 */
 function getPdfSchema(path) {
    let pdfSchema = require(`${path}/pdfSchema`);
    return pdfSchema;
}

/**
 * @description validate parameter is not empty
 * @param {Object} args - validate against argument
 * @param {Array} paramList - parameters to validate
 * @returns {Boolean}
 */
function validateParams(args = {}, paramList = []) {
    let isValid = true;
    const length = paramList.length;
    for (let i = 0; i < length; i++) {
        const param = paramList[i];
        const value = args[param];
        const hasParam = Object.prototype.hasOwnProperty.call(args, param);
        if (!hasParam) {
            isValid = false;
            break;
        }

        const isEmpty = (value === "" || value === null);
        if (isEmpty) {
            isValid = false;
            break;
        }
    }
    if (!isValid) return isValid;
    return (Object.keys(args).length === length);
}

/**
 * Export modules
 */
module.exports = {
    getConfigParams,
    getPdfSchema,
    validateParams,
};