const express = require("express");
const router = express.Router();
const passport = require("passport");
const commentsControllers = require("../controllers/commentController");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management
 */

/**
 * @swagger
 * /api/posts/{postID}/comments:
 *   get:
 *     summary: Retrieve a list of comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postID
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       content:
 *                         type: string
 *                       author:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       replies:
 *                         type: array
 *                         items:
 *                           type: string
 */
router.get("/posts/:postID/comments", commentsControllers.getComments);

/**
 * @swagger
 * /api/posts/{postID}/comments/{commentID}:
 *   get:
 *     summary: Retrieve a single comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postID
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *       - in: path
 *         name: commentID
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: A single comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     author:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     replies:
 *                       type: array
 *                       items:
 *                         type: string
 *       404:
 *         description: Comment not found
 */
router.get(
  "/posts/:postID/comments/:commentID",
  commentsControllers.getComment
);

/**
 * @swagger
 * /api/posts/{postID}/comments:
 *   post:
 *     summary: Add a new comment to a post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postID
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     author:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *       400:
 *         description: Validation error
 */
router.post(
  "/posts/:postID/comments",
  passport.authenticate("jwt", { session: false }),
  commentsControllers.addComment
);

/**
 * @swagger
 * /api/posts/{postID}/comments/{commentID}/reply:
 *   post:
 *     summary: Reply to a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postID
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *       - in: path
 *         name: commentID
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reply added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     author:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     parentComment:
 *                       type: string
 *       400:
 *         description: Validation error
 */
router.post(
  "/posts/:postID/comments/:commentID/reply",
  passport.authenticate("jwt", { session: false }),
  commentsControllers.replyToComment
);

/**
 * @swagger
 * /api/posts/{postID}/comments/{commentID}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postID
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *       - in: path
 *         name: commentID
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     author:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *       400:
 *         description: Validation error
 */
router.put(
  "/posts/:postID/comments/:commentID",
  passport.authenticate("jwt", { session: false }),
  commentsControllers.updateComment
);

/**
 * @swagger
 * /api/posts/{postID}/comments/{commentID}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postID
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *       - in: path
 *         name: commentID
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete(
  "/posts/:postID/comments/:commentID",
  passport.authenticate("jwt", { session: false }),
  commentsControllers.deleteComment
);

module.exports = router;
