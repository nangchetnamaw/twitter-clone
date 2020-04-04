const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const tweetModel = require('../schemas/tweet');

 const Schema = mongoose.Schema({
     tweetId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Tweet"
     },
     userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
     }
 });

const lretweetModel = mongoose.model('retweet', Schema);
router.post('/',async(req, res) => {
    const { tweetId, userId } = req.body;
    const tweetObj = await tweetModel.findOne({ _id: tweetId });
    res.send("retweeted");
   await tweetModel.insertMany({content:tweetObj.content});
})

module.exports = router;