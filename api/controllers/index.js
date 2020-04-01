const composeTweet = require('./composeTweet');
const profile = require('./profile');
//const follow = require('./follow');
const unfollow = require('./unfollow');
const likeTweet = require('./likeTweet');
const unlikeTweet=require('./unlikeTweet');
const retweet=require('./retweet');

//new code
const user = require('./user');
const follow = require('./follow');
const comment = require('./comment');

module.exports = {
    composeTweet: composeTweet,
    profile: profile,
    //follow:follow,
    unfollow:unfollow,
    likeTweet: likeTweet,
    unlikeTweet:unlikeTweet,
    retweet:retweet,
    //new code
    user: user,
    follow:follow,
    comment: comment

}