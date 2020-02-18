const userDetails = require('./userDetails');
const follower = require('./followers');
const following = require('./following');
const tweets = require('./tweets');
const retweets = require('./retweets');
const likes = require('./likes');
const comments = require('./comments');

module.exports = {
    userDetails: userDetails,
    follower: follower,
    following: following,
    tweets: tweets,
    retweets: retweets,
    likes: likes,
    comments: comments
}