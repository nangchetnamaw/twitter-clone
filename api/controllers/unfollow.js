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

    const unfollower = await model.followerModel.unfollow({"user" : req.body.unfollowedObj, "follower" : req.body.unfollowerId})
    const unfollowed = await model.followingModel.unfollow({"user": req.body.unfollowerId, "following" : req.body.unfollowedId})

    res.send("unfollowed")

    }
}

module.exports = new Unfollow();

