const { User } = require('../models/signup');
const { followerModel } = require('./follow');
const { followingModel } = require('./follow');
const Tweet = require('../schemas/tweets');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

    
    const id = req.body.userId;
    console.log(id);
    const followings = await followingModel.find({ userId: id }, {followingId : 1, _id : 0});

    console.log(followings, "helooooooooooooooooo");

    var arrayOfTweets = [];

    for (let i = 0; i < followings.length; i++){
        const tweetCreater = followings[i].followingId;
        console.log(tweetCreater);
        const tweetsOfCreater = await Tweet.find({ user: tweetCreater });

        console.log(tweetsOfCreater, "here bro");

        for (let j = 0; j < tweetsOfCreater.length; j++){
            
            arrayOfTweets.push(tweetsOfCreater[j])

        }    

    }

    res.send(arrayOfTweets) ;

})

module.exports = router;