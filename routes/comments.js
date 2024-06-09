const express = require("express");
const router = express.Router();
const passport = require("passport");
const commentsControllers = require("../controllers/commentController");

router.get("/posts/:postID/comments", commentsControllers.getComments);

router.get(
  "/posts/:postID/comments/:commentID",
  commentsControllers.getComment
);

router.post(
  "/posts/:postID/comments",
  passport.authenticate("jwt", { session: false }),
  commentsControllers.addComment
);

router.post(
  "/posts/:postID/comments/:commentID/reply",
  passport.authenticate("jwt", { session: false }),
  commentsControllers.replyToComment
);

router.put(
  "/posts/:postID/comments/:commentID",
  passport.authenticate("jwt", { session: false }),
  commentsControllers.updateComment
);

router.delete(
  "/posts/:postID/comments/:commentID",
  passport.authenticate("jwt", { session: false }),
  commentsControllers.deleteComment
);

module.exports = router;
