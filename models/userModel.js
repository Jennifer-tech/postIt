const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    gender: {
        type: String,
        trim: true,
        enum: ['male', 'female', 'non-binary', 'none'],
        default: 'none',
    },
})
module.exports = mongoose.model("User", userSchema);