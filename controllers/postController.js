const Post = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({})
    .populate("author")
    .sort({ createdAt: 1 })
    .exec();

  res.json({ posts });
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postID).populate("author").exec();

  if (post === null) {
    // No results.
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  res.json({ post });
});

exports.createPost = [
  body("title").trim().notEmpty().withMessage("Title cannot be empty").escape(),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty")
    .escape(),
  body("excert").trim().escape(),
  body("tags.*").trim().escape(),
  body("status").trim().escape(),
  body("image").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    console.log(req.user);
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      excert: req.body.excert,
      author: req.user._id,
      tags: req.body.tags,
      status: req.body.status,
      image: req.body.image,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      await post.save();
      res.json({ message: "Post created succesfully!", post });
    }
  }),
];

exports.updatePost = [
  body("title").trim().notEmpty().withMessage("Title cannot be empty").escape(),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty")
    .escape(),
  body("excert").trim().escape(),
  body("tags.*").trim().escape(),
  body("status").trim().escape(),
  body("image").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      excert: req.body.excert,
      author: req.user._id,
      tags: req.body.tags,
      status: req.body.status,
      image: req.body.image,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      await Post.findByIdAndUpdate(req.params.id, post, {});
      res.json({ message: "Post updated succesfully!", post });
    }
  }),
];

exports.deletePost = asyncHandler(async (req, res, next) => {
  await Promise.all([
    Comment.deleteMany({ post: req.params.id }),
    Post.findByIdAndDelete(req.params.id).exec(),
  ]);

  res.json({ message: "Post deleted succesfully!" });
});
