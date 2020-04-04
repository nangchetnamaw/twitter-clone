const { User } = require('../models/signup');
const { followerModel } = require('./follow');
const { followingModel } = require('./follow');
const Tweet = require('../schemas/tweets');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authentication');

router.get('/', authenticate,  async (req, res) => {
    res.send({ 'userTweets': 'userTweets', 'tweetsOfFollowings': 'tweetsOfFollowings'}) ;

})

module.exports = router;