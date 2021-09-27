/**
 * Module dependencies
 */
const router = require('express').Router();

/**
 * Attach route(s)
 */
router.use('/', require('./pdf'));
router.use('/', require('./unknown'));

/**
 * Export router
 */
module.exports = router;