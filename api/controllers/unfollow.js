const { User } = require('../models/signup');
const follow = require('./follow');
const express = require('express');
const router = express.Router();
router.put('/', async (req, res) => {
    const followerModel = follow.followerModel;
    const followingModel = follow.followingModel;
    const { userId, followerId } = req.body;
    const userToBeUnfollowed = await User.findOne({ userhandle: userId });
    const userUnfollower = await User.findOne({ userhandle: followerId });

    await followerModel.deleteMany({ followerId: userToBeUnfollowed, userId: userUnfollower });
    await followingModel.deleteMany({ followingId: userUnfollower, userId: userToBeUnfollowed });

    const beingUnfollowed = await User.findOne({ userhandle: userId });
    const unfollowing = await User.findOne({ userhandle:followerId });
    followerCount = beingUnfollowed.followerCount;
    followingCount = unfollowing.followingCount;
    
    await User.updateOne({ userhandle : userId  }, { followerCount: followerCount - 1 });
    await User.updateOne({ userhandle: followerId }, { followingCount: followingCount - 1 });

    res.send({response: 'Unfollowed'});
});

module.exports = router;
