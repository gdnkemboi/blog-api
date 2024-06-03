const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

exports.getComments = asyncHandler(async (req, res, next) => {
  res.send({ message: "NOT IMPLEMENTED GET All Comments" });
});

exports.getComment = asyncHandler(async (req, res, next) => {
  res.send({ message: "NOT IMPLEMENTED GET Comment" });
});

exports.createComment = asyncHandler(async (req, res, next) => {
  res.send({ message: "NOT IMPLEMENTED Create Comment" });
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  res.send({ message: "NOT IMPLEMENTED Update Comment" });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  res.send({ message: "NOT IMPLEMENTED DELETE Comment" });
});
