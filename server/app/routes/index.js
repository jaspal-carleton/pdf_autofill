/**
 * Module dependencies
 */
const router = require('express').Router();

/**
 * Route for API version 1.0
 */
const v1Routes = require('./v1/index');

/**
 * Attach route
 */
router.use('/v1', v1Routes);

/**
 * Fallback route defaults to v1
 */
router.use('/', v1Routes);

/**
 * Export router
 */
module.exports = router;