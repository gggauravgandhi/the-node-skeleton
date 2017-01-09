'use strict';

const path = require('path');
const mongoose = require('mongoose');

const config = require(path.resolve(require.cache.userObject.appPath, 'config/index.js'));
const logger = config.logger.createLogger('clone/crud');
const mongooseSchema = mongoose.Schema;

const coreObject = {};

coreObject.storeNumber = (req, res, next) => {
  const newNumberDocument = coreObject.getNumberModelInstance();
  newNumberDocument.value = req.params.number;
  newNumberDocument.result = req.tempData.result;

  newNumberDocument.save()
  .then(() => {
    next();
  })
  .catch((err) => {
    next(err);
  });
};

coreObject.getNumberModelInstance = () => {
  if (coreObject.numberModel) return new coreObject.numberModel();

  const numberSchema = new mongooseSchema({
    value: { type: Number },
    result: { type: String },
    date: { type: Date, default: Date.now },
  });

  coreObject.numberModel = mongoose.model('numbers', numberSchema);

  return new coreObject.numberModel();
};

/////

module.exports = coreObject;

