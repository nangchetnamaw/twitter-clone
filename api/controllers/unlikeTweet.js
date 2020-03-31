const models=require('../models');
const tweetModel =models.tweetModel;
const likesModel=models.likeModel;

class unlike{
    constructor(){ }
    async unlike(req,res){
         try{
            const unlikeObj={
                userId: req.query.userId,
                tweetId:req.query.tweetId
            }
           const liked= await likesModel.get({ userId:unlikeObj.userId, tweetId:unlikeObj.tweetId},{});
           console.log(liked._id,"liked obj")
           if(liked)
           {
               const del=await likesModel.delete({ _id:liked[0]._id});
               console.log(del,'delete');
               const likeCount=await tweetModel.get({_id: unlikeObj.tweetId},{likeCount:1,_id:0});
               if(likeCount>0)
               await tweetModel.update({ _id: unlikeObj.tweetId }, { $inc: { "likeCount": -1 } });
               else
               await tweetModel.update({ _id: unlikeObj.tweetId }, { $inc: { "likeCount": 0 } });
               res.status(200).send("tweet unliked");
            }
        else{
            res.send("post not liked,so cant be unliked")
        }
    }
    catch(error){
        console.log(error);
        
    }
}
}
module.exports = new unlike()

// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const tweetModel = require('../schemas/tweet');

// const Schema = mongoose.Schema({
//     tweetId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Tweet"
//     },
//     likedBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     }
// });
// const likeModel = mongoose.model('unlikeTweet', Schema);

// router.post('/', async (req, res) => {
//     console.log('Deepak');
//     const { tweetId,likedBy } = req.body;
//     const tweetObj = await tweetModel.findOne({ _id: tweetId });
//     const likedByUserObj = await tweetModel.findOne({ _id: likedBy });
//     console.log(tweetObj, likedByUserObj);
//     await likeModel.create({ tweetObj, likedByUserObj });   
//     const likes = tweetObj.likeCount-1;

//     await tweetModel.updateOne({'_id': tweetId}, { 'likeCount': likes });

//     console.log(likes);
//     res.send('Tweet unLiked');
// });

// module.exports = router;