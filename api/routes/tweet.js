const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const Follow = require("../models/follow");
const Tweet = require("../models/tweet");
const Like = require("../models/like");
const Retweet = require("../models/retweet");
const Reply = require("../models/reply");

router.post("/", async (req, res) => {
  const user = req.body.user;
  const content = req.body.content;

  await Tweet.create({ user, content });

  res.send({
    success: true
  });
});

router.get("/feed", async (req, res) => {
  const userId = req.user._id;
  let tweets = [];
  const followings = await Follow.find({ followId: userId }).select("userId");
  
  const tempPromise = async () => {
    await Promise.all(
      followings.map(async following => {
        const tweetArray = await Tweet.find({ user: following.userId }).populate('user');
        tweets = [...tweets, ...tweetArray];
      })
    );
    return tweets;
  };
  const retTweets = await tempPromise();
  res.send({
    success: true,
    payload: {
      tweets: retTweets
    }
  });
});

router.get("/", async (req, res) => {
  const userhandle = req.query.userhandle;
  const _id = await User.findOne({ userhandle: userhandle }).select("_id");
  const tweets = await Tweet.find({ user: _id }).populate('user');
  res.send({
    success: true,
    payload: {
      tweets,
      tweetCount: tweets.length
    }
  });
});

router.delete("/", async (req, res) => {
  await Tweet.deleteOne({ _id: req.body.tweetId });

  res.send({
    success: true
  });
});

router.patch("/", async (req, res) => {
  if (req.body.type === "like") {
    if (req.body.operation === "inc") {
      await Tweet.findOneAndUpdate(
        { _id: req.body.tweetId },
        { $inc: { "count.likeCount": 1 } }
      );

      await Like.create({ tweetId: req.body.tweetId, userId: req.user._id });
    }
    if (req.body.operation === "dec") {
      await Tweet.findOneAndUpdate(
        { _id: req.body.tweetId },
        { $inc: { "count.likeCount": -1 } }
      );

      await Like.deleteOne({
        tweetId: req.body.tweetId,
        userId: req.user._id
      });
    }
  }

  if (req.body.type === "retweet") {
    if (req.body.operation === "inc") {
      await Tweet.findOneAndUpdate(
        { _id: req.body.tweetId },
        { $inc: { "count.retweetCount": 1 } }
      );

      await Retweet.create({
        tweetId: req.body.tweetId,
        userId: req.body.userId
      });

      const tweet = await Tweet.findOne({ _id: req.body.tweetId });
      await Tweet.create({ user: req.user._id, content: tweet.content });
    }
    if (req.body.operation === "dec") {
      await Tweet.findOneAndUpdate(
        { _id: req.body.tweetId },
        { $inc: { "count.retweetCount": -1 } }
      );

      await Retweet.deleteOne({
        tweetId: req.body.tweetId,
        userId: req.user._id
      });

      const tweet = await Tweet.findOne({ _id: req.body.tweetId });
      await Tweet.deleteOne({ user: req.user._id, content: tweet.content });
    }
  }

  if (req.body.type === "reply") {
    if (req.body.operation === "inc") {
      await Tweet.findOneAndUpdate(
        { _id: req.body.tweetId },
        { $inc: { "count.replyCount": 1 } }
      );

      await Reply.create({
        tweetId: req.body.tweetId,
        userId: req.body.userId,
        content: req.body.content
      });
    }
  }

  res.send({
    success: true,
    payload: {

    }
  });
});

module.exports = router;
