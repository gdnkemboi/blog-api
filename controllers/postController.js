const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

exports.getPosts = asyncHandler(async (req, res, next) => {
  res.send({ message: "NOT IMPLEMENTED GET All Posts" });
});

exports.getPost = asyncHandler(async (req, res, next) => {
  res.send({ message: "NOT IMPLEMENTED GET Post" });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  res.send({ message: "NOT IMPLEMENTED Create Post" });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  res.send({ message: "NOT IMPLEMENTED Update Post" });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  res.send({ message: "NOT IMPLEMENTED DELETE Post" });
});
