const model = require('../models');

class tweets {

    constructor() {
    }

    async composeTweet(req, res){
        // if (!req.file) {
        //     return res.status(200).send({
        //         success: false
        //     });
        // } 
        // else {
        try{
            let _id = (model.tokenDecoder(req.headers.authorization))._id;
            let retweetId = req.body.retweetId;
            // let tagsArray = [];
            // let mentionArray = [];
            // let countTag = 0, countMention = 0;
            // let textArray = (req.body.text).split(" ");
            // for(let index = 0; index < textArray.length; index++){
            //     if(textArray[index].charAt(0) == "@"){
            //         mentionArray[countMention] = textArray[index];
            //         countMention++;
            //     }
            //     else if(textArray[index].charAt(0) == "#"){
            //         tagsArray[countTag] = textArray[index];
            //         countTag++;
            //     }
            // }
            let tweetObject = {
                "user" : _id,
                "content" : {
                    "text" : req.body.content.text,
                    // "imageURL" : req.file.path,
                    // "tags": tagsArray,
                    // "mentions": (req.body.mentions).split(",")
                },
                "date" : Date.now(),
                "retweetId": retweetId
            };
                var result = await model.tweetModel.save(tweetObject);

                if(retweetId){
                    await model.tweetModel.update({_id:retweetId},{$inc: { "retweetCount": 1 }})
                }
                res.status(200).send(result);

            }
            catch(err){
                res.status(400).send(err);
            }
    
    }

    async allTweets(req, res){
        let tweets = await model.tweetModel.get();
        console.log(tweets);
        if(tweets){
            res.status(200).send(tweets);
        }
        else{
            res.status(501).send({
                "message": "Some Error Occured"
            });
        }
    }
}

module.exports = new tweets();