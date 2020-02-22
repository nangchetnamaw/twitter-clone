const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    text: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true
    },
    imageURL: {
      type: String,
      default: null
    },
    mentions: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    tags: [
      {
        type: String
      }
    ]
  },
  recentLikes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    validate: [
      function(val) {
        return val.length <= 3;
      },
      "Recent likes exceeds the limit of 3"
    ]
  },
  date: {
    type: Date,
    default: Date.now()
  },
  replies: {
    type: Schema.Types.ObjectId,
    ref: "Reply"
  },
  likes: {
    type: Schema.Types.ObjectId,
    ref: "Like"
  },
  retweets: {
    type: Schema.Types.ObjectId,
    ref: "Retweet"
  },
  count: {
    likeCount: {
      type: Number,
      default: 0
    },
    replyCount: {
      type: Number,
      default: 0
    },
    retweetCount: {
      type: Number,
      default: 0
    }
  }
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
