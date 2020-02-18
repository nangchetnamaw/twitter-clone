const { User } = require('../models/signup');
const { followerModel } = require('./follow');
const { followingModel } = require('./follow');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const id = req.params.parameter;

    const followings = await followingModel.find({ userId: id }, {followingId : 1, _id : 0});

    console.log(followings, "helooooooooooooooooo");

    

    res.send("done")

})

module.exports = router;