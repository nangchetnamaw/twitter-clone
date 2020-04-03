const tweetModel = require('./tweetModel')
const userModel = require('./userModel')
const followerModel = require('./followerModel')
const followingModel = require('./followingModel')
const likeModel = require('./like');
const tokenDecoder = require('./tokenDecoder');

module.exports = {
    tweetModel: tweetModel,
    userModel: userModel,
    likeModel: likeModel,
    followerModel : followerModel,
    followingModel : followingModel,
    tokenDecoder: tokenDecoder
}