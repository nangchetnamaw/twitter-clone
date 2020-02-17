const model = require('../models')

class Unfollow {
    constructor(){

    }

async unfollowUpdate(req,res){
    let unfollowerObj={
        $inc: {'followingCount': -1}   
    }

    let unfollowedObj={
        $inc: {'followerCount': -1}   
    }

    // console.log(updateObj)

    const unfollower = await model.userModel.unfollow({"userHandle": req.body.unfollowerId},  unfollowerObj)
    const unfollowed = await model.userModel.unfollow({"userHandle": req.body.unfollowedId},  unfollowedObj)

    const unfollower = await model.followerModel.unfollow({"user" : req.body.unfollowedId, "follower" : req.body.unfollowerId})
    const unfollowed = await model.followingModel.unfollow({"user": req.body.unfollowerId, "following" : req.body.unfollowedId})

    res.send("unfollowed")

    }
}

module.exports = new Unfollow();

// const mongoose = require('mongoose');
// const express = require('express');
// const router = express.Router();
// const { User } = require('../models/signup');
// const { followerModel } = require('.\follow');
// const { followingModel } = require('.\follow');

// router.post('/', async (req, res) => {
//     const { userId, unfollowerId } = req.body;
//     const userToBeUnfollowed = await User.findOne({ userhandle: userId });
//     const userUnfollower = await User.findOne({ userhandle: unfollowerId });

//     console.log('userA', userToBeUnfollowed, 'userB', userUnfollower, 'pehli line');

//     await followerModel.deleteOne({ userId: userToBeUnfollowed, followerId: userUnfollower });
//     await followingModel.deleteOne({ userId: userUnfollower, followingId: userToBeUnfollowed });

//     const toBeUnfollowed = await User.findOne({ userhandle: userId });
//     const unfollower = await User.findOne({ userhandle:followerId });
//     followerCount = toBeUnfollowed.followerCount;
//     followingCount = unfollower.followingCount;
//     console.log(followingCount, 'followingCount', followerCount, 'followerCount', 'doosri line');

//     await User.updateOne({ userhandle : userId  }, { followerCount: followerCount - 1 });
//     await User.updateOne({ userhandle: unfollowerId }, { followingCount: followingCount - 1 })
//     console.log(followingCount, 'followingCount', followerCount, 'followerCount', 'tisri line');

//     res.send('Unfollowed');
// });

// module.exports = router;








