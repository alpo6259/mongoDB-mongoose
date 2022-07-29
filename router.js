const { Router } = require('express');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const phoneRouter = require('./routes/phoneRouter');

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);

router.use('/phones', phoneRouter);

module.exports = router;
