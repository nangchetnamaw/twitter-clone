const express = require('express');
const router = express.Router();
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

router.get('/', async(req, res) => {
    const tweets = await Tweet.find({ _id: req.query.userId }).map((cur) => {
        Tweet.findOne({ _id: cur._id }).populate(());
    });

    res.send({
        success: true,
        payload: {
            tweets
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
            
        }
    }
});


module.exports = router;