const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        minlength: 50,
        maxlength: 400,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    }
});

const Reply = mongoose.model('Reply', schema);

module.exports = Reply;