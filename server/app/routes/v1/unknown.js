/**
 * Module dependencies
 */
const router = require('express').Router();

const { generateError } = require('../../helpers/response');


/**
 * Unknown routes
 */
router.all("*", (req, res, next) => {
    const httpError = generateError(404, 'UNSUPPORTED_API');
    next(httpError);
});

/**
 * Export router
 */
module.exports = router;