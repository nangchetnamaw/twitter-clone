const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const tweetModel = require('../schemas/tweets');

const Schema = mongoose.Schema({
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});
const likeModel = mongoose.model('unlikeTweet', Schema);

router.post('/', async (req, res) => {
    console.log('Deepak');
    const { tweetId,likedBy } = req.body;
    const tweetObj = await tweetModel.findOne({ _id: tweetId });
    const likedByUserObj = await tweetModel.findOne({ _id: likedBy });
    console.log(tweetObj, likedByUserObj);
    await likeModel.create({ tweetObj, likedByUserObj });   
    const likes = tweetObj.likeCount-1;

    await tweetModel.updateOne({'_id': tweetId}, { 'likeCount': likes });

    console.log(likes);
    res.send('Tweet unLiked');
});

module.exports = router;