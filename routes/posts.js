const express = require("express");
const router = express.Router();
const passport = require("passport");
const postControllers = require("../controllers/postController");

router.get("/posts", postControllers.getPosts);

router.get("/posts/:id", postControllers.getPost);

router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postControllers.createPost
);

router.put(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  postControllers.updatePost
);

router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  postControllers.deletePost
);

module.exports = router;
