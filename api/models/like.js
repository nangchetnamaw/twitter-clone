const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    tweetId = {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    },
    userId = {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    time: {
        type: Date,
        default: Date.now()
    }
});

const Like = mongoose.model('Like', schema);

module.exports = Like;