const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reTweetSchema = new mongoose.Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    tweetId: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    },

    content: {
        text: String,
        tags: [
            {
                type: String,
                required: true
            }
        ],
        mentions: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },

    commentCount: {
        type: Number,
        default: 0
    },

    likeCount: {
        type: Number,
        default: 0
    }

});

const Retweet = mongoose.model('Retweet', reTweetSchema);
module.exports = Retweet;