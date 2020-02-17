// const model = require('../models');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User } = require('../models/signup');
const Joi = require('joi');

// class Follow {
//     constructor(){

//     }

const FollowerSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const FollowingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const followerModel = mongoose.model('UserFollower', FollowerSchema);
const followingModel = mongoose.model('UserFollowing', FollowingSchema);

router.post('/', async (req, res) => {
    const { userId, followerId } = req.body;
    const userToBeFollowed = await User.findOne({ userhandle: userId });
    const userFollower = await User.findOne({ userhandle: followerId });

    console.log('userA', userToBeFollowed, 'userB', userFollower, 'pehli line');

    await followerModel.create({ userId: userToBeFollowed, followerId: userFollower });
    await followingModel.create({ userId: userFollower, followingId: userToBeFollowed });

    const follower = await User.findOne({ userhandle: userId });
    const following = await User.findOne({ userhandle:followerId });
    followerCount = follower.followerCount;
    followingCount = following.followingCount;
    console.log(followingCount, 'followingCount', followerCount, 'followerCount', 'doosri line');

    await User.updateOne({ userhandle : userId  }, { followerCount: followerCount + 1 });
    await User.updateOne({ userhandle: followerId }, { followingCount: followingCount + 1 })
    console.log(followingCount, 'followingCount', followerCount, 'followerCount', 'tisri line');

    res.send('Followed');
});

function validateFollow(obj){
    // Joi.string().min(3).max(5) -> Example
    const schema = {
        userId: Joi.required,
        followerId: Joi.required
    }; 

    return Joi.validate(obj, schema);
}

// async followUpdate(req,res){
//     var followerObj={
//         $inc: {'followingCount': 1}   
//     }

//     var followedObj={
//         $inc: {'followerCount': 1}   
//     }

//     // console.log(updateObj)

//     const follower = await model.userModel.follow({"userHandle": req.body.followerId},  followerObj)
//     const followed = await model.userModel.follow({"userHandle": req.body.followedId},  followedObj)

//     var followerObj = {
//         "user" : req.body.followedId,
//         "follower" : req.body.followerId
//     }

//     var followedObj = {
//         "user": req.body.followerId,
//         "following" : req.body.followedId
//     }

//     const follower = await model.followerModel.follow(followerObj)
//     const followed = await model.followingModel.follow(followedObj)

//     res.send("followed")

//     }
// }

module.exports = router;
// module.exports.followerModel = followerModel;
// module.exports.followingModel = followerModel;
module.exports.validateFollow = validateFollow;