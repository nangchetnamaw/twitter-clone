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
           if(liked)
           {
               const del=await likesModel.delete({ _id:liked[0]._id});
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