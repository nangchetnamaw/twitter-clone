const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const commentsSchema = Schema({
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    tweet: {
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    },

    comment: {
        type: String
    }

});
 
const Comment = mongoose.model('Comment', commentsSchema);
module.exports = Comment; 
