// const model = require('../models');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User } = require('../models/signup');
const Joi = require('joi');

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

const followerModel = mongoose.model('followerModel', FollowerSchema);
const followingModel = mongoose.model('followingModel', FollowingSchema);

router.post('/', async (req, res) => {
    
    const userId = req.body.userId;
    const followerId = req.body.followerId;
    
    const userToBeFollowed = await User.findOne({ userhandle: userId });
    const userFollower = await User.findOne({ userhandle: followerId });

    console.log('userA', userToBeFollowed, 'userB', userFollower, 'pehli line');

    await followerModel.create({ userId: userToBeFollowed, followerId: userFollower });
    await followingModel.create({ userId: userFollower, followingId: userToBeFollowed });

    const follower = await User.findOne({ userhandle: userId });
    const following = await User.findOne({ userhandle:followerId });

    // console.log(follower, "hereeeeeeee")

    followerCount = follower.followerCount;
    followingCount = following.followingCount;

    console.log(follower.followingCount, 'followingCount', following.followerCount, 'followerCount', 'doosri line');

    await User.updateOne({ userhandle : userId  }, { followerCount: followerCount + 1 });
    await User.updateOne({ userhandle: followerId }, { followingCount: followingCount + 1 })

    console.log(follower.followingCount, 'followingCount', following.followerCount, 'followerCount', 'tisri line');

    res.send({response: 'Followed'});
});

router.get('/', async(req, res) => {
    console.log(req.query);
    const { userId, followerId } = req.query;
    const user = await User.findOne({ userhandle: userId });
    const follower = await User.findOne({ userhandle: followerId });
    console.log(user, follower);
    const relation = await followerModel.findOne({ user, follower });
    res.send({'relation': relation});
});

function validateFollow(obj){
    // Joi.string().min(3).max(5) -> Example
    const schema = {
        userId: Joi.required,
        followerId: Joi.required
    }; 

    return Joi.validate(obj, schema);
}

module.exports.router = router;
module.exports.followerModel = followerModel;
module.exports.followingModel = followingModel;
module.exports.validateFollow = validateFollow;