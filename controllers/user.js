const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const commentModel = require('../models/commentModel');
const postModel = require('../models/postModel');
const User = require("../models/userModel");

exports.signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: "User does not exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "3d" });
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, userName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists" });
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords does not match" });
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, fullName: `${firstName} ${lastName}`, userName })

        res.status(200).json({ result })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find();

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: "An error occured" })
    }
}
exports.getUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// exports.createUser = async (req, res) => {
//     const { userId } = req.params;
//     const { fullName, userName, email, password, gender } = req.body;

//     try {
//         const newUser = new User({ fullName, userName, email, password, gender, userId });
//         await newUser.save();

//         res.status(201).json(newComment)
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }
exports.updateUser = async (req, res) => {
    const { userId: _id } = req.params;
    const user = req.body;
    try {
        const userExists = await User.findById(_id);
        if (!userExists) return res.status(404).send("No User with that id");

        const updatedUser = await User.findByIdAndUpdate(_id, { ...user }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        //get user with id from user model
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User with id does not exist" });

        await User.findByIdAndDelete(userId);
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


exports.getUserCommentsById = async (req, res) => {
    const { userId, postId, commentId } = req.params;
    try{
        const userComment = await commentModel.findOne({_id: commentId, userId: userId, postId: postId});
        if (!userComment) return res.status(404).json({message: 'Comment does not exist'});

        res.status(200).json({message: 'Success', data: userComment});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.getUserPostComments = async (req, res) => {
    const { userId, postId } = req.params;

    try{
        const userComments = await commentModel.find({postId, userId});
        if (!userComments || userComments.length === 0) return res.status(200).json({message: 'There are no comments under this post'});

        res.status(200).json({message: 'Success', data: userComments});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.getUserPostById = async (req, res) => {
    const { userId, postId } = req.params;

    try {
        const userPost = await postModel.findOne({_id: postId, user: userId});
        if (!userPost) return res.status(404).json({message: 'Post does not exist'});

        res.status(200).json({message: 'Success', data: userPost});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getUserPosts = async (req, res) => {
    const { userId } = req.params;

    try {
        const userPosts = await postModel.find({user: userId});
        if (!userPosts || userPosts?.length == 0) return res.status(200).json({message: 'This user has not made any posts', data: []});

        res.status(200).json({message: 'Success', data: userPosts});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
exports.getUserByHandle = async (req, res) => {
    const { userHandle } = req.params;

    try {
        const user = await  User.findOne({username: userHandle});
        if (!user) return res.status(404).json({message: 'User with this handle does not exist'});

        return res.status(200).json({data: user, message: 'successful'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getUserPostsByHandle = async (req, res) => {
    const { userHandle } = req.params;

    try {
        const user = await  User.findOne({username: userHandle});
        if (!user) return res.status(404).json({message: 'User with this handle does not exist'});

        const posts = await postModel.find({user: user._id});

        return res.status(200).json({data: posts, message: 'success'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}