const express = require("express");
const { signin, signup, 
    getUser, deleteUser, 
    updateUser, getAllUsers, 
    getUserCommentsById, getUserPostComments, 
    getUserPostById, getUserPosts, 
    getUserByHandle, getUserPostsByHandle } = require("../controllers/user.js");
const { authentication } = require("../middleware/authentication.js")
const router = express.Router();

router.get("/:userId/posts/:postId/comments/:id", authentication, getUserCommentsById)
router.get("/:userId/posts/:postId/comments", authentication, getUserPostComments)
router.get("/:userId/posts/:postId", authentication, getUserPostById)
router.get("/:userId/posts", authentication, getUserPosts)
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/:userId", getUser);
router.delete('/:userId', authentication, deleteUser); 
router.put('/:userId', authentication, updateUser);
// router.post('/', authentication, createUser);
router.get('/', getAllUsers);

router.get('/:userHandle', authentication, getUserByHandle);
router.get('/:userHandle/posts', authentication, getUserPostsByHandle);


module.exports = router;
