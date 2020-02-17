const composeTweet = require('./composeTweet');
const profile = require('./profile');
const follow = require('./follow');
const unfollow = require('./unfollow');
const likeTweet = require('./likeTweet')

module.exports = {
    composeTweet: composeTweet,
    profile: profile,
    follow:follow,
    unfollow:unfollow,
    likeTweet: likeTweet
}