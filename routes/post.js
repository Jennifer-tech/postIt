const express = require("express");
const { getPosts, getPost, createPost, updatePost, deletePost, getPostsBySearch, commentPost, likePost } = require("../controllers/post.js");
const { authentication } = require("../middleware/authentication.js")
const router = express.Router();

router.post("/:id/commentPost", authentication, commentPost)
router.put("/:id/likePost", authentication, likePost);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);
router.delete('/:postId', authentication, deletePost);
router.put('/:id', authentication, updatePost);
router.post('/', authentication, createPost);
router.get('/', getPosts);

module.exports = router;