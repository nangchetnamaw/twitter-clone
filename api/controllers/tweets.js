const { User } = require('../models/signup');
const { followerModel } = require('./follow');
const { followingModel } = require('./follow');
const Tweet = require('../schemas/tweets');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const id = req.query.id;
    console.log(id);
    const user = await User.findOne({userhandle: id});
    const followings = await followingModel.find({ userId: user }, {followingId : 1, _id : 0});

    console.log(followings, "heloo");

    var userTweets = [];
    const loggedInUserTweets = await Tweet.find({ user: user })
    for (let k = 0; k < loggedInUserTweets.length; k++){
            
        userTweets.push(loggedInUserTweets[k])

    }  
    // console.log(arrayOfTweets, "printing looged in user tweets");
    const tweetsOfFollowings = [];
    for (let i = 0; i < followings.length; i++){
        const tweetCreater = followings[i].followingId;
        console.log(tweetCreater);
        const tweetCreatorObj = await User.find({ userhandle: tweetCreater });
        const tweetsOfCreater = await Tweet.find({ user: tweetCreatorObj });

        console.log(tweetsOfCreater, "here bro");

        for (let j = 0; j < tweetsOfCreater.length; j++){
            
            tweetsOfFollowings.push(tweetsOfCreater[j])

        }    

    }

    console.log({ 'userTweets': userTweets, 'tweetsOfFollowings': tweetsOfFollowings});
    res.send({ 'userTweets': userTweets, 'tweetsOfFollowings': tweetsOfFollowings}) ;

})

module.exports = router;