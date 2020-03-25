const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require('./user');
const tweet = require('./tweet');
 
const likeSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },

    tweetId: {
        type: Schema.Types.ObjectId,
        ref: "tweet"
    },
    
});
 
const Like = mongoose.model('Like', likeSchema);
module.exports = Like; 