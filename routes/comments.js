const express = require("express");
const router = express.Router();
const commentsControllers = require("../controllers/commentController");

router.get("/comments", commentsControllers.getComments);

router.get("/comments/:commentID", commentsControllers.getComment);

router.post("/comments", commentsControllers.createComment);

router.put("/comments/:commentID", commentsControllers.updateComment);

router.delete("/comments/:commentID", commentsControllers.deleteComment);

module.exports = router;
