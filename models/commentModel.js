const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    message: {
        type: String,
        trim: true,
        required: true,
    },
    
    // likes: {
    //     type: [String],
    //     default: [],
    // },
}, { timestamps: true });


module.exports = mongoose.model("Comment", CommentSchema);