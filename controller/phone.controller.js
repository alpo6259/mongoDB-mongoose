const mongoose = require('mongoose');
const createHttpError = require('http-errors');
const _ = require('lodash');
const { Phone } = require('../models');

module.exports.createPhone = async (req, res, next) => {
  const { body } = req;

  try {
    const newPhoneInstance = new Phone(body);
    const createdPhone = await newPhoneInstance.save();
    if (!createdPhone) {
      return next(createHttpError(400, 'Bad Request'));
    }
    res.status(201).send({ data: createdPhone });
  } catch (err) {
    next(err);
  }
};

module.exports.getPhones = async (req, res, next) => {
  try {
    const foundPhones = await Phone.find()
      .limit(2)
      .skip(0);
    if (!foundPhones) {
      return next(createHttpError(400, 'Bad Request'));
    }
    res.status(200).send({ data: foundPhones });
    //
    //хотел вырезять 'userId' но не придумал способ
   
  } catch (err) {
    next(err);
  }
};
module.exports.getPhoneById = async (req, res, next) => {
  const { phoneId } = req.params;
  console.log('phoneId', phoneId);

  try {
    const foundPhone = await Phone.findById(phoneId);
    if (!foundPhone) {
      return next(createHttpError(404, 'Not Found'));
    }

    const preparedPhone = _.omit(foundPhone.toObject(), ['userId']);
    res.status(200).send({ data: preparedPhone });
    //
  } catch (err) {
    next(err);
  }
};
module.exports.updatePhoneById = async (req, res, next) => {
  const {
    body,
    params: { phoneId },
  } = req;
  try {
    const updatePhone = await Phone.findByIdAndUpdate(phoneId, body, {
      new: true,
      runValidators: true,
    });
    if (!updatePhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }
    const preparedPhone = _.omit(updatePhone.toObject(), ['userId']);
    res.status(200).send({ data: preparedPhone });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePhoneById = async (req, res, next) => {
  const { phoneId } = req.params;
  try {
    const deletedPhone = await Phone.findByIdAndDelete(phoneId);
    if (!deletedPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

//
//возник вопрос с путями, ибо getPhones и getPhonesByUser лежат на пути '/phones'
//
//
module.exports.getPhonesByUser = async (req, res, next) => {
  try {
    const foundPhonesByUser = await Phone.find().populate('userId');
    if (!foundPhonesByUser) {
      return next(createHttpError(400, 'bad request'));
    }
    res.status(200).send({ data: foundPhonesByUser });
  } catch (err) {
    next(err);
  }
};
