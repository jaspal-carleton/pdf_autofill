/**
 * Runtime enviroment
 */
const NODE_ENVIRONMENT = process.env.NODE_ENV || "development";

/**
 * @description Extract error stack
 * @param {Object} error - error stack
 * @return {String} - error description
 */
function getErrorStack(error) {
    if (error.stack) {
        return error.stack;
    }
    if (typeof error.toString === "function") {
        return error.toString();
    }
    return "";
}

/**
 * @description Console log error message
 * @param {String} error - error message
 * @returns {None}
 */
function logErrorMessage(error) {
    console.error(`Error Stack >>> ${error} <<<`);
}

/**
 * @description Validate HTTP error range
 * @param {Number} httpCode - HTTP status code
 * @return {Boolean}
 */
function isValidHttpCode(httpCode) {
    return httpCode >= 400 && httpCode < 600;
}

/**
 * @description Look for an error HTTP status code (in order of preference):
 * - Error object (`status` or `statusCode`)
 * - Express response object (`statusCode`)
 * Falls back to a 500 (Internal Server Error) HTTP status code.
 * @param {Object} options
 * @param {Error} options.error
 * @param {Object} options.response - Express response object
 * @return {Number} - HTTP status code
 */
function getHttpStatusCode({ error, response }) {
    const statusCodeFromError = error.status || error.statusCode;
    if (isValidHttpCode(statusCodeFromError)) {
        return statusCodeFromError;
    }
    const statusCodeFromResponse = response.statusCode;
    if (isValidHttpCode(statusCodeFromResponse)) {
        return statusCodeFromResponse;
    }
    return 500;
}

/**
 * @description Get error description
 * @param {String} error - error message
 * @returns {String}
 */
function getErrorDescription(error) {
    let rc;
    switch (error) {
        case "MISSING_MANDATORY_PARAMETERS":
            rc = "Either first name, last name, gender, or birth date is missing in the request";
            break;
        case "INVALID_FIRST_NAME":
            rc = "First name provided should have valid characters";
            break;
        case "INVALID_LAST_NAME":
            rc = "Last name provided should have valid characters";
            break;
        case "INVALID_GENDER":
            rc = "The gender value can be either male or female";
            break;
        case "INVALID_PROVINCE":
            rc = "The province value can be either CA or NY";
            break;
        case "INVALID_BIRTH_DATE":
            rc = "The date should be in YYYY-MM-DD format";
            break;
        case "INTERNAL_SERVER_ERROR":
            rc = "Error during database operation";
            break;
        case "UNSUPPORTED_API":
            rc = "The endpoint does not exist or is not implemented";
            break;

        default:
            rc = "Sorry, no error description available";
            break;
    }
    return rc;
}

/**
 * @description Generic Express error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express `next()` function
 */
function errorHandler(err, req, res, next) {
    const errorStack = getErrorStack(err);
    logErrorMessage(errorStack);
    if (res.headersSent) {
        return next(err);
    }
    const errorCode = getHttpStatusCode({ error: err, response: res });
    const errorResponse = {
        code: errorCode,
        message: err.message,
        description: getErrorDescription(err.message),
    };
    if (NODE_ENVIRONMENT === "development") {
        errorResponse.stack = errorStack;
    }
    res.status(errorCode);
    res.format({
        "application/json": () => {
            res.json({
                success: false,
                error: errorResponse,
            });
        },
        default: () => {
            res.type("text/plain").send(errorResponse.description);
        },
    });
    next();
}

/**
* Export modules
*/
module.exports = {
    errorHandler,
};