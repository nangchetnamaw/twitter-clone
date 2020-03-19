const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const tweetSchema = Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  content: {
    text: String,
    imageURL: String,
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

  date: {
    type: Date,
    default: Date.now()
  },

  commentCount: {
    type: Number,
    default:0,
    required: true
  },

  likeCount: {
    type: Number,
    required: true,
    default: 0
  },
 
  retweetCount: {
    type: Number,
    required: true,
    default: 0
  }

});
 
const Tweet = mongoose.model("Tweet", tweetSchema);
module.exports = Tweet;
