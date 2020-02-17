const model = require('../models')

class LikeTweet {
    constructor(){

    }

    async likeUpdate(req,res){
       
        var like={
            $inc: {'likeCount': 1}   
        }

        const like = await model.tweetModel.like({"likeCount": req.body.likeCount},  like)


        var like= {
            "likeCount": req.body.likeCount
        }

        res.send("like")

    }


}
module.exports = new LikeTweet();