const mongoose = require("mongoose");
const PostMessage = require("../models/postModel");
const { post } = require("../routes/comment");


exports.getPosts = async (req, res) => {
    // const { page } = req.query;
    try {
        const postMessage = await PostMessage.find();

        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({ message: "An error occured" })
    }
}
exports.getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
exports.getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query

    try {
        // the flag "i" stands for ignore case
        // Regular expression was used because it's easier for mongodb and mongoose to search the database
        const title = new RegExp(searchQuery, "i");
        // $or- it stands for either find the title or the tags
        // $in- it checks if there's a tag in the specific array of tag that matches our query
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] });
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
exports.createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, user: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
exports.updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
        res.json(updatedPost)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.deletePost = async (req, res) => {
    const { postId } = req.params;
    // get user id from the authentication middleware
    const userId = req.userId;

    try {
        //get post with id from post model
        const post = await PostMessage.findById(postId);
        if (!post) return res.status(404).json({ message: "Post with does not exist" });

        // check if post creator is the same as the user id from authentication
        console.log(post.user)
        if (post.user === userId) {
            await PostMessage.findByIdAndDelete(postId);
        } else {
            return res.status(401).json({ message: "You cannot delete this post because you're not the creator" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
exports.likePost = async (req, res) => {
    const { id } = req.params;

    try {
        if (!req.userId) return res.json({ message: "unathenticated" });

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

        const post = await PostMessage.findById(id);

        // to check if the user's id is already in the like section
        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            // like the post
            post.likes.push(req.userId);
        } else {
            // dislike a post
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    try {
        const post = await PostMessage.findById(id);

        post.comments.push(value);

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}