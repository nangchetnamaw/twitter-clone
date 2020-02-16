const model = require('../models')

class Follow {
    constructor(){

    }

async followUpdate(req,res){
    var followerObj={
        $inc: {'followingCount': 1}   
    }

    var followedObj={
        $inc: {'followerCount': 1}   
    }

    // console.log(updateObj)

    const follower = await model.userModel.follow({"userHandle": req.body.followerId},  followerObj)
    const followed = await model.userModel.follow({"userHandle": req.body.followedId},  followedObj)

    var followerObj = {
        "user" : req.body.followedObj,
        "follower" : req.body.followerId
    }

    var followedObj = {
        "user": req.body.followerId,
        "following" : req.body.followedId
    }

    const follower = await model.followerModel.follow(followerObj)
    const followed = await model.followingModel.follow(followedObj)

    res.send("followed")

    }
}

module.exports = new Follow();