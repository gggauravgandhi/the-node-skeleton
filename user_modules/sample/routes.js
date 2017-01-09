'use strict';

const path = require('path');
const config = require(path.resolve(require.cache.userObject.appPath, 'config/index.js'));
const logger = config.logger.createLogger('sample/routes');

const router = require('express').Router();

const validationObject = require(path.join(__dirname, 'validations.js'));
const crudObject = require(path.join(__dirname, 'crud.js'));
const dataObject = require(path.join(__dirname, 'data.js'));

router.get('/',
  crudObject.greetUser,
  function (req, res, next) {
    res.send(req.tempData.greetMsg);
  });

router.get('/sqr/:number',
  validationObject.validateSquareNumber,
  crudObject.squareNumber,
  dataObject.storeNumber,
  function (req, res, next) {
    res.send(req.tempData.result);
  });

module.exports = router;

