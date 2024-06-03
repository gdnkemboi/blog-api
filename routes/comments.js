const express = require("express");
const router = express.Router();
const passport = require("passport");
const commentsControllers = require("../controllers/commentController");

router.get("/comments", commentsControllers.getComments);

router.get("/comments/:commentID", commentsControllers.getComment);

router.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  commentsControllers.createComment
);

router.put(
  "/comments/:commentID",
  passport.authenticate("jwt", { session: false }),
  commentsControllers.updateComment
);

router.delete(
  "/comments/:commentID",
  passport.authenticate("jwt", { session: false }),
  commentsControllers.deleteComment
);

module.exports = router;
