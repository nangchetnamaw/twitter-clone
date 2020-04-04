const models=require('../models');
const tweetModel =models.tweetModel;
const likesModel=models.likeModel;

class like{
    constructor(){ }
    async updateLike(req,res){
         try{
            const likeObj={
                userId: req.body.userId,
                tweetId:req.body.tweetId
            }
            
            await likesModel.create({ userId:likeObj.userId, tweetId:likeObj.tweetId});
            const obj=await tweetModel.update({ _id: likeObj.tweetId }, { $inc: { "likeCount": 1 } });
            res.status(200).send("tweet liked");
    }
    catch(error){
        console.log(error);
        
    }
}
}
module.exports = new like()