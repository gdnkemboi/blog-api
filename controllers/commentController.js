const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Helper function to recursively populate replies
async function populateReplies(comment) {
  const populatedComment = await Comment.populate(comment, {
    path: "replies",
    populate: { path: "replies" },
  });

  if (populatedComment.replies && populatedComment.replies.length > 0) {
    populatedComment.replies = await Promise.all(
      populatedComment.replies.map(populateReplies)
    );
  }

  return populatedComment;
}

exports.getComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({
    post: req.params.postID,
    status: "approved",
  }).lean();

  // Populate replies recursively
  const populatedComments = await Promise.all(comments.map(populateReplies));

  res.json({ comments: populatedComments });
});

exports.getComment = exports.getComments = asyncHandler(
  async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentID).lean();

    if (comment === null) {
      // No results.
      const err = new Error("Comment not found");
      err.status = 404;
      return next(err);
    }
    // Populate replies recursively
    const populatedComments = await populateReplies(comment);

    res.json({ comments: populatedComments });
  }
);

exports.addComment = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Comment cannot be empty")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newComment = new Comment({
      post: req.params.postID,
      author: req.user._id,
      content: req.body.content,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      // Save the new comment
      await newComment.save();
      res.status(201).json({ comment: newComment });
    }
  }),
];

exports.replyToComment = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Comment cannot be empty")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newComment = new Comment({
      post: req.params.postID,
      author: req.user._id,
      content: req.body.content,
      parentComment: req.params.commentID,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      // Save the new comment
      await newComment.save();

      // update parent comment replies array
      await Comment.findByIdAndUpdate(req.params.commentID, {
        $push: { replies: newComment._id },
      });

      res.status(201).json({ comment: newComment });
    }
  }),
];

exports.updateComment = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Comment cannot be empty")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const updatedComment = new Comment({
      post: re.params.postID,
      author: req.user._id,
      content: re.body.content,
      _id: req.params.commentID,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      // Save the new comment
      await Comment.findByIdAndUpdate(req.params.commentID, updatedComment, {});
      res.status(201).json({ comment: updatedComment });
    }
  }),
];

// Helper function to find all replies recursively
async function findReplies(commentId) {
  const replies = await Comment.find({ parentComment: commentId })
    .select("_id")
    .lean();
  const allReplies = await Promise.all(
    replies.map(async (reply) => {
      const nestedReplies = await findReplies(reply._id);
      return [reply._id, ...nestedReplies];
    })
  );
  return allReplies.flat();
}

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const commentId = req.params.commentID;
  const comment = await Comment.findById(commentId);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  // Find all replies recursively
  const repliesToDelete = await findReplies(commentId);

  // Delete the comment and all its replies
  await Comment.deleteMany({ _id: { $in: [commentId, ...repliesToDelete] } });

  // If the comment is a reply, remove its ID from the parent's replies array
  if (comment.parentComment) {
    await Comment.findByIdAndUpdate(comment.parentComment, {
      $pull: { replies: commentId },
    });
  }

  res
    .status(200)
    .json({ message: "Comment and its replies deleted successfully" });
});
