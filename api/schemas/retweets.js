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
// const mongoose = require("mongoose");
// const moment = require('moment');
// const Schema = mongoose.Schema;
// //Importing userSchema
// const User = require('./userDetails');
// const Tweet = require('./tweets');
 
// const retweetSchema = Schema({
    
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: "User"
//     },
//     content: {
//         type: String,
//     },
//     retweetContent: {
//         type: Schema.Types.ObjectId,
//         ref: "Tweet"
//     },
//     mentions: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: "User"
//         }
//     ],
//     recentLikes: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: "User"
//         }
//     ],
//     tags: [
//         {
//             type: String,
//             required: true
//         }
//     ],
//     date: {
//         type: moment.utc()
//     },
//     comments: {
//         type: Schema.Types.ObjectId,
//         ref: "Comments"
//     },
//     likes: {
//         type: Schema.Types.ObjectId,
//         ref: "Likes"
//     },
//     retweet: {
//         type: Schema.Types.ObjectId,
//         ref: "Retweet"
//     },
    
// });
 
// const Retweet = mongoose.model('Retweet', retweetSchema);
// module.exports = Retweet;