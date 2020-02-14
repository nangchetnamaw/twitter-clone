const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Importing userSchema
const Tweet = require('./tweets');
 
const commentsSchema = Schema({
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tweetComments: {
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    },
    reComments: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
});
 

const Comment = mongoose.model('Comment', commentsSchema);
module.exports = Comment; 

