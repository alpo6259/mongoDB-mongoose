const createError = require('http-errors');
const { Post } = require('../models');

module.exports.getPosts = async (req, res, next) => {
  try {
    const foundPosts = await Post.find().populate('userId');
    res.status(200).send({ data: foundPosts });
  } catch (err) {
    next(err);
  }
};
