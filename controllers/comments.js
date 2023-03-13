const mongoose = require("mongoose");
const Comment = require("../models/commentModel.js");

exports.getAllComment = async (req, res) => {
    try {
        const comment = await Comment.find();

        res.status(200).json(comment);
    } catch (error) {
        res.status(404).json({ message: "An error occured" })
    }
}
exports.getComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
exports.createComment = async (req, res) => {
    const { postId } = req.params
    const { userId, message } = req.body;

    try {
        const newComment = new Comment({ postId, userId, message });
        await newComment.save();

        res.status(201).json(newComment)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
exports.updateComment = async (req, res) => {
    const { id: _id } = req.params;
    const comment = req.body;
    try {

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Comment with that id");

        const updatedComment = await Comment.findByIdAndUpdate(_id, { ...comment, _id }, { new: true });
        res.json(updatedComment)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
exports.deleteComment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No comment with that id");
    await Comment.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully" })
}