const mongoose = require('mongoose');
const {
  PHONE_SERIAL_NUMBER_VALIDATION_SCHEMAS,
} = require('../utils/validationSchemas');

const phoneSchema = new mongoose.Schema(
  {
    brand: { type: 'string', required: true },
    model: { type: 'string', required: true },
    manufactureDate: { type: 'date', max: new Date(), required: true },
    ram: { type: 'number', min: 0, default: 1 },
    cpu: { type: 'string', required: true },
    cpuCapacity: {
      type: 'number',
      enum: {
        values: [2, 4, 8],
        massage: 'bit capacity is limited, you need to select `2`, `4`, `8`',
      },
    },
    nfc: { type: 'boolean', default: false },
    serialNumber: {
      type: 'string',
      required: true,

      validate: {
        validator: v => {
          PHONE_SERIAL_NUMBER_VALIDATION_SCHEMAS.isValidSync(v);

          // валидация не работает от слова вообще, не разобрался по чему
        },
      },
    },
    userId: {
      type: mongoose.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false }
);

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;
