const model = require('../models');

class tweets {

    constructor() {
    }

    async composeTweet(req, res){
        let _id = (model.tokenDecoder(req.headers.authorization))._id;
        let tagsArray = [];
        let mentionArray = [];
        let countTag = 0, countMention = 0;
        let textArray = [];
        console.log(req.body);
        if(req.body.text != ""){
            textArray = (req.body.text).split(" ");
        }
        console.log("_id:    ", _id);
        for(let index = 0; index < textArray.length; index++){
            if(textArray[index].charAt(0) == "@"){
                mentionArray[countMention] = textArray[index];
                countMention++;
            }
            else if(textArray[index].charAt(0) == "#"){
                tagsArray[countTag] = textArray[index];
                countTag++;
            }
        }
        let mentions = [];
        if(req.body.mentions != ""){
            mentions = req.body.mentions;
        }
        console.log("Thrid Checkpoint");
        let path = "";
        console.log(mentions);
        if (req.file) {
            path = req.file.path;
        } 
        let tweetObject = {
            "user" : _id,
            "content" : {
                "text" : req.body.text,
                "imageURL" : path,
                "tags": tagsArray,
                "mentions": mentions
            },
            "date" : Date.now()
        };
        var result = await model.tweetModel.save(tweetObject);
        return res.status(200).send("Uploaded");
        // if (!req.file) {
        //     return res.status(501).send({
        //         success: false
        //     });
        // } 
        // else {
        //     let _id = (model.tokenDecoder(req.headers.authorization))._id;
        //     let tagsArray = [];
        //     let mentionArray = [];
        //     let countTag = 0, countMention = 0;
        //     let textArray = (req.body.text).split(" ");
        //     for(let index = 0; index < textArray.length; index++){
        //         if(textArray[index].charAt(0) == "@"){
        //             mentionArray[countMention] = textArray[index];
        //             countMention++;
        //         }
        //         else if(textArray[index].charAt(0) == "#"){
        //             tagsArray[countTag] = textArray[index];
        //             countTag++;
        //         }
        //     }
        //     let tweetObject = {
        //         "user" : _id,
        //         "content" : {
        //             "text" : req.body.text,
        //             "imageURL" : req.file.path,
        //             "tags": tagsArray,
        //             "mentions": (req.body.mentions).split(",")
        //         },
        //         "date" : Date.now()
        //     };
        //     var result = await model.tweetModel.save(tweetObject);
        //     return res.status(200).send("Uploaded");
        // }
    
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