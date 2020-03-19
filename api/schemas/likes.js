const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const likeSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    tweet: {
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    },
    
});
 
const Like = mongoose.model('Like', likeSchema);
module.exports = Like; 