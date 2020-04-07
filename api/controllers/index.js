const composeTweet = require('./composeTweet');
const profile = require('./profile');
const unfollow = require('./unfollow');
const likeTweet = require('./likeTweet');
const unlikeTweet=require('./unlikeTweet');
const retweet=require('./retweet');
const explore=require('./explore');
const user = require('./user');
const follow = require('./follow');
const comment = require('./comment');

module.exports = {
    tweet: composeTweet,
    profile: profile,
    unfollow: unfollow,
    likeTweet: likeTweet,
    unlikeTweet: unlikeTweet,
    retweet: retweet,
    user: user,
    follow:follow,
    comment: comment,
    explore: explore
}