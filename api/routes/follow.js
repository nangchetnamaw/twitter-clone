const express = require('express');
const router = express.Router();
const Follow = require('../models/follow');
const { User } = require('../models/user');

router.post('/', async (req, res) => {
    const { userhandle, followerhandle } = req.body;
    const userId = await User.findOne({ userhandle: userhandle }).select('_id');
    const followId = await User.findOne({ userhandle: followerhandle }).select('_id');
    
    await User.updateOne({ _id: userId._id }, { $inc: { "count.followingCount": 1 } });
    await User.updateOne({ _id: followId._id }, { $inc: { "count.followerCount": 1 } });
    await Follow.create({ userId: userId._id, followId: followId._id });

    console.log(userId, followId, 'Inside post');
    res.send({
        success: true,
        payload: {

        }
    });
});

router.delete('/', async (req, res) => {
    const { userhandle, followerhandle } = req.query;
    const userId = await User.findOne({ userhandle: userhandle }).select('_id');
    const followId = await User.findOne({ userhandle: followerhandle }).select('_id');
    console.log(userId, followId, 'Inside Delete');

    await User.updateOne({ _id: userId._id }, { $inc: { "count.followingCount": -1 } });
    await User.updateOne({ _id: followId._id }, { $inc: { "count.followerCount": -1 } });
    await Follow.deleteOne({ userId: userId._id, followId: followId._id });

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
    const userId = await User.findOne({ userhandle: req.body.userhandle }).select('_id');
    const followerId = await User.findOne({ userhandle: req.body.followerhandle }).select('_id');
    console.log('Inside Relation', userId, followerId);

    const relation = await Follow.findOne({ followId: userId._id, userId: followerId._id });
    console.log('Inside Relation', relation, userId, followerId);
    res.send({
        success: true,
        payload: {
            isRelation: relation? true : false
        }
    });
});

module.exports = router;