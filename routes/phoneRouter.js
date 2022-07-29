const { Router } = require('express');
const { phoneController } = require('../controller');

const phoneRouter = Router();
phoneRouter
  .route('/')
  .post(phoneController.createPhone)
  .get(phoneController.getPhones);

// phoneRouter.get('/', phoneController.getPhonesByUser);

phoneRouter
  .route('/:phoneId')
  .get(phoneController.getPhoneById)
  .patch(phoneController.updatePhoneById)
  .delete(phoneController.deletePhoneById);

module.exports = phoneRouter;
