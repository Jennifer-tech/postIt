const express = require("express");
const { getAllComment, getComment, createComment, updateComment, deleteComment } = require("../controllers/comments.js");
const router = express.Router();

// /comments/posts/:postId/comments
router.get('/posts/:postId/comments/:id', getComment);
router.put('/posts/:postId/comments/:id', updateComment);
router.delete('/posts/:postId/comments/:id', deleteComment);
router.get('/posts/:postId/comments', getAllComment);
router.post("/posts/:postId/comments", createComment);


module.exports = router;