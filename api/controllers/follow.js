const model = require('../models')

class Follow {
    constructor(){

    }

async followUpdate(req,res){
    let followerObj={
        $inc: {'followingCount': 1}   
    }

    let followedObj={
        $inc: {'followerCount': 1}   
    }

    // console.log(updateObj)

    const follower = await model.userModel.follow({userHandle: req.body.followerId},  followerObj)
    const followed = await model.userModel.follow({userHandle: req.params.followedId},  followedObj)

    let followerObj = {
        "user" : req.params.followedObj,
        "follower" : req.params.followerId
    }

    let followedObj = {
        "user": req.params.followerId,
        "following" : req.params.followedId
    }

    const follower = await model.followerModel.follow(followerObj)
    const followed = await model.followingModel.follow(followedObj)

    res.send("followed")

    }
}

module.exports = new Follow();