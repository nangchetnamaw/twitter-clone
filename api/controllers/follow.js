const express = require('express');
const follower = require('../models/followerModel');
const following = require('../models/followingModel');
const {User} = require('../models/user');

class followController{
    constructor(){

    }
    async follow(req, res) {
        try{
            const { userhandle, followerhandle } = req.body;
            const userId = await User.findOne({ userhandle: userhandle }).select('_id');
            const followId = await User.findOne({ userhandle: followerhandle }).select('_id');
            let followObj={
                user:userId,
                follower:followId,
            }
            let followingObj={
                user:followId,
                following:userId
            }
            const relation = await follower.getRelation(followObj);
            const followingRelation = await following.getRelation(followingObj);
            
            if( relation== null && followingRelation== null){
                await User.updateOne({ _id: userId._id }, { $inc: { "followerCount": 1 } });
                await User.updateOne({ _id: followId._id }, { $inc: { "followingCount": 1 } });
                await follower.create(followObj);
                await following.create(followingObj);
            
                res.send({
                    success: true,
                    payload: {
            
                    }
                });
                
            }
            else{
                res.send("already following")
            }
        }
        catch(error){
            console.log(error);
        }
    };


    async unfollow(req, res) {
        try{
                const { userhandle, followerhandle } = req.body;
                const userId = await User.findOne({ userhandle: userhandle }).select('_id');
                const followId = await User.findOne({ userhandle: followerhandle }).select('_id');  
                let followObj={
                    user:userId,
                    follower:followId
                }
                let followingObj={
                    user:followId,
                    following:userId
                }

                const relation = await follower.getRelation(followObj);
                const followingRelation = await following.getRelation(followingObj);
                
                if(relation!= null && followingRelation!= null){
                 
                await User.updateOne({ _id: userId._id }, { $inc: { "followerCount": -1 } });
                await User.updateOne({ _id: followId._id }, { $inc: { "followingCount": -1 } });
                await follower.delete(followObj);
                await following.delete(followingObj);

                res.send({
                    success: true,
                    payload: {
                        
                    }
                });
            }

            else{
                res.send("already unfollowed")
            }
        }
        catch(error){
            console.log(error);
        }
    
    };

    async checkRelation(req,res){
        const { userhandle, followerhandle } = req.body;
        const userId = await User.findOne({ userhandle: userhandle }).select('_id');
        const followId = await User.findOne({ userhandle: followerhandle }).select('_id'); 
        let checkObj={
            user:userId,
            follower:followId
        }
        const relation = await follower.getRelation(checkObj);
        if(relation!=null){
            res.send({
                success: true,
                payload: {
                    isRelation: true
                }
            });
        }
        else{
            res.send({
                success: true,
                payload: {
                    isRelation: false
                }
            });
        }
    };
}
module.exports = new followController();