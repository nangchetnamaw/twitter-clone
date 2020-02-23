const express = require('express');
const router = express.Router();
const Follow = require('../models/follow');
const { User } = require('../models/user');

router.post('/', async (req, res) => {
    const { userId, followId } = req.body;

    await User.updateOne({ _id: userId }, { $inc: { "count.followingCount": 1 } });
    await User.updateOne({ _id: followId }, { $inc: { "count.followerCount": 1 } });
    await Follow.create({ userId, followId });

    res.send({
        success: true,
        payload: {

        }
    });
});

router.delete('/', async (req, res) => {
    const { userId, followId } = req.body;

    await User.updateOne({ _id: userId }, { $dec: { "count.followingCount": 1 } });
    await User.updateOne({ _id: followId }, { $dec: { "count.followerCount": 1 } });
    await Follow.deleteOne({ userId, followId });

    res.send({
        success: true,
        payload: {
            
        }
    });
});

router.get('/', async (req, res) => {
    const followers = await Follow.find({ userId: req.body.userId }).select('userId');
    const followings = await Follow.find({ userId: req.body.userId }).select('followId');
    
    res.send({
        success: true,
        payload: {
            followers,
            followings
        }
    })
});

router.post('/relation', async(req, res) => {
    const userId = await User.findOne({ userhandle: req.body.userId }).select('_id');
    const followerId = await User.findOne({ userhandle: req.body.followerId }).select('_id');

    const relation = await Follow.findOne({ userId, followId });
    console.log('Inside Relation', relation);
    res.send({
        success: true,
        payload: {
            isRelation: relation? true : false
        }
    });
});

module.exports = router;