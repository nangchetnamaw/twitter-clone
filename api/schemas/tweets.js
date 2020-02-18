
    

constmongoose = require("mongoose");
// const moment = require('moment');
constSchema = mongoose.Schema;
//Importing userSchema
constUser = require("./userDetails");
 
consttweetSchema = Schema({
user: {
type:Schema.Types.ObjectId,
ref:"User"
  },
content: {
text:String,
 
imageURL:String,
mentions: [
      {
type:Schema.Types.ObjectId,
ref:"User"
      }
    ]
  },
recentLikes: [
    {
type:Schema.Types.ObjectId,
ref:"User"
    }
  ],
tags: [
    {
type:String,
required:true
    }
  ],
date: {
type:Date,
default:Date.now()
  },
comments: {
type:Schema.Types.ObjectId,
ref:"Comments"
  },
commentCount: {
type:Number,
required:true
  },
likes: {
type:Schema.Types.ObjectId,
ref:"Likes"
  },
likeCount: {
type:Number,
required:true,
default:0
  },
 
retweet: {
type:Schema.Types.ObjectId,
ref:"Retweet"
  }
});
 
constTweet = mongoose.model("Tweet", tweetSchema);
module.exports = Tweet;

