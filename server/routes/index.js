const { Router } = require('express');
const router = Router();

const postRouter = require('./post');
const userRouter = require('./user');
const authRouter = require('./auth');

router.use('/post', postRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);


module.exports = router;