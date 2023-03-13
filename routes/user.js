const express = require("express");
const { signin, signup, getUser, deleteUser, updateUser, getAllUsers } = require("../controllers/user.js");
const { authentication } = require("../middleware/authentication.js")
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/:userId", getUser);
router.delete('/:userId', authentication, deleteUser); 
router.put('/:userId', authentication, updateUser);
// router.post('/', authentication, createUser);
router.get('/', getAllUsers);

module.exports = router;
