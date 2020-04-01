const tweetModel = require("../models/tweetModel")
const commentModel = require('../models/commentModel')


class comment{
    constructor(){

    }
    async comment(req, res) {
        try{
            let commentObj={
                user: req.body.user,
                tweet: req.body.tweet,
                comment: req.body.comment,
            }
            await commentModel.create(commentObj);
            var commentedInTweet = tweetModel.findOne({_id:commentObj.tweet});
            if(commentedInTweet != null){
                await tweetModel.update({_id: commentObj.tweet},{ $inc: {"commentCount":1} });
                res.send({
                    success: true,
                    payload: {
            
                    }
                });
            }
            else{
                res.send("no such tweet");
            }
           
           

        }
        catch(error){
            console.log(error);
        }
    };
}

module.exports = new comment();