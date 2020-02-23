const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Importing userSchema
const Tweet = require('./tweets');
 
const likeSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
},
    tweetLikes: {
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    },
    
});
 
const Like = mongoose.model('Like', likeSchema);
module.exports = Like; 