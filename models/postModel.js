const mongoose = require('mongoose');

const postMessageSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    message: {
        type: String,
        trim: true,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tags: {
        type: [String],
        trim: true,
    },
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    comments: {
        type: [String],
        default: []
    },
}, { timestamps: true });

module.exports = mongoose.model("Post", postMessageSchema);