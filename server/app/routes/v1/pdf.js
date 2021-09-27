/**
 * Module dependencies
 */
const router = require('express').Router();
const {
    createPdf,
} = require('../../services/pdf');
const {
    generateError,
    generateSuccess
} = require('../../helpers/response');
const {
    validateParams
} = require('../../helpers/params');
const {
    validateName,
    validateGender,
    validateProvince,
    validateDateFormat,
} = require('../../helpers/payload');

/**
 * Route interceptor for creating new pdf
 */
router.post('/pdf', (req, res, next) => {
    // HTTP POST req body
    const { body } = req;

    // Check HTTP body object present
    const isValid = validateParams(body, [
        'first_name',
        'last_name',
        'gender',
        'province',
        'birth_date',
    ]);
    if (!isValid) {
        next(generateError(400, 'MISSING_MANDATORY_PARAMETERS'));
        return;
    }

    // Extract body object
    const first_name = body.first_name;
    const last_name = body.last_name;
    const gender = body.gender;
    const province = body.province.toLowerCase();
    const birth_date = body.birth_date;

    // Validate body object attribute values
    if (!validateName(first_name)) {
        next(generateError(400, "INVALID_FIRST_NAME"));
        return;
    }
    if (!validateName(last_name)) {
        next(generateError(400, "INVALID_LAST_NAME"));
        return;
    }
    if (!validateGender(gender)) {
        next(generateError(400, "INVALID_GENDER"));
        return;
    }
    if (!validateProvince(province)) {
        next(generateError(400, "INVALID_PROVINCE"));
        return;
    }
    if (!validateDateFormat(birth_date)) {
        next(generateError(400, "INVALID_BIRTH_DATE"));
        return;
    }

    // Create new pdf
    const reply = createPdf(
        first_name,
        last_name,
        gender,
        province,
        birth_date
    );
    reply.then(result => {
        if (result.status) {
            res.status(200);
            res.json(generateSuccess(result));
        }
        else {
            next(generateError(500, "INTERNAL_SERVER_ERROR"));
        }
    });
    reply.catch(err => next(generateError(500, "INTERNAL_SERVER_ERROR")));
});

/**
 * Export router
 */
module.exports = router;