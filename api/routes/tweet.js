const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const Follow = require('../models/follow');
const Tweet = require('../models/tweet');
const Like = require('../models/like');
const Retweet = require('../models/retweet');
const Reply = require('../models/reply');

router.post('/', async (req, res) => {
    const user = req.body.user;
    const content = req.body.content;

    await Tweet.create({ user, content });
    
    res.send({
        success: true
    });
});

router.get('/feed', async(req, res) => {
    const userId = req.user._id;
    console.log(userId);
    const tweets = [];
    const followings = await Follow.find({ userId }).select('followId');
    console.log(followings);
    followings.map(async (cur) => {
        tweets.push(await Tweet.find({ user: cur.followId }));
    });

    console.log(tweets, 'I was here');

    res.send({
        success: true,
        payload: {
            tweets
        }
    });
});

router.get('/', async(req, res) => {
    const userhandle = req.query.userhandle;
    const _id = await User.findOne({ userhandle: userhandle }).select('_id');
    const tweets = await Tweet.find({ user: _id });
    console.log(_id, tweets);
    console.log('I was here');
    res.send({
        success: true,
        payload: {
            tweets,
            tweetCount: tweets.length
        }
    });
});

router.delete('/', async (req, res) => {
    await Tweet.deleteOne({ _id: req.body.tweetId });

    res.send({
        success: true
    });
});

router.patch('/', async(req, res) => {
    if(req.body.type === 'like'){
        if(req.body.operation === 'inc'){
            await Tweet.findOneAndUpdate({ _id: req.body.tweetId }, { $inc: { "count.likeCount": 1 } });

            await Like.create({ tweetId: req.body.tweetId, userId: req.body.userId });
        }
        if(req.body.operation === 'dec'){
            await Tweet.findOneAndUpdate({ _id: req.body.tweetId }, { $dec: { "count.likeCount": 1 } });

            await Like.deleteOne({ tweetId: req.body.tweetId, userId: req.body.userId });
        }
    }

    if(req.body.type === 'retweet'){
        if(req.body.operation === 'inc'){
            await Tweet.findOneAndUpdate({ _id: req.body.tweetId }, { $inc: { "count.retweetCount": 1 } });

            await Retweet.create({ tweetId: req.body.tweetId, userId: req.body.userId });

            const tweet = await Tweet.findOne({ _id: req.body.tweetId });
            await Tweet.create({ user: req.body.userId, content: tweet.content });
        }
        if(req.body.operation === 'dec'){
            await Tweet.findOneAndUpdate({ _id: req.body.tweetId }, { $dec: { "count.retweetCount": 1 } });

            await Retweet.deleteOne({ tweetId: req.body.tweetId, userId: req.body.userId });

            await Tweet.deleteOne({ _id: req.retweetId });//Recheck It
        }
    }

    if(req.body.type === 'reply'){
        if(req.body.operation === 'inc'){
            await Tweet.findOneAndUpdate({ _id: req.body.tweetId }, { $inc: { "count.replyCount": 1 } });

            await Reply.create({ tweetId: req.body.tweetId, userId: req.body.userId, content: req.body.content });
        }
        if(req.body.operation === 'dec'){
            await Tweet.findOneAndUpdate({ _id: req.body.tweetId }, { $dec: { "count.likeCount": 1 } });

            await Reply.deleteOne({ _id: req.replyId });
        }
    }
    
});


module.exports = router;