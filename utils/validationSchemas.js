const yup = require('yup');

module.exports.EMAIL_VALIDATION_SCHEMA = yup.string().email();

module.exports.PHONE_SERIAL_NUMBER_VALIDATION_SCHEMAS = yup
  .string()
  .matches(/^[a-z]{3}[0-9]{3}$/);
