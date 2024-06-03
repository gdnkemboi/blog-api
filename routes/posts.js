const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/postController");

router.get("/posts", postControllers.getPosts);

router.get("/posts/:postID", postControllers.getPost);

router.post("/posts", postControllers.createPost);

router.put("/posts/:postID", postControllers.updatePost);

router.delete("/posts/:postID", postControllers.deletePost);

module.exports = router;
