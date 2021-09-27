/**
 * Module dependencies
 */
const express = require('express');
const app = express();

/**
 * Enable HTTP request logger for app
 */
const morgan = require('morgan');
app.use(morgan('dev'));
app.locals.pretty = true;

/**
 * Read config file
 */
const { getConfigParams } = require('./helpers/params');
app.locals.configs = getConfigParams(`${__dirname}/configs`);

/**
 * Config ExpressJS
 */
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

/**
 * Enable CORS
 */
const cors = require('cors')
app.use(cors());

/**
 * Attach ExpressJS router
 */
const routes = require('./routes/index');
app.use('/api', routes);

/**
 * Error handler middleware
 */
const { errorHandler } = require('./middlewares/error');
app.use(errorHandler);

/**
 * Export express app
 */
module.exports = app;