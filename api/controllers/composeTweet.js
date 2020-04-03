const model = require('../models');

class tweets {

    constructor() {
    }

    async composeTweet(req, res){
        console.log(req.body.text);
        if (!req.file) {
            return res.status(200).send({
                success: false
            });
        } 
        else {
            let _id = (model.tokenDecoder(req.headers.authorization))._id;
            let tagsArray = [];
            let mentionArray = [];
            let countTag = 0, countMention = 0;
            let textArray = (req.body.text).split(" ");
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
            console.log(req.body);
            console.log(tagsArray);
            console.log(mentionArray);
            let tweetObject = {
                "user" : _id,
                "content" : {
                    "text" : req.body.text,
                    "imageURL" : req.file.path,
                    "tags": tagsArray,
                    "mentions": (req.body.mentions).split(",")
                },
                "date" : Date.now()
            };
            console.log("======", tweetObject);
            var result = await model.tweetModel.save(tweetObject);
            console.log(result);
            try{
                return res.status(200).send("Uploaded");
            }catch(err){
                return res.status(501).send("Some Error Occured");
            }
        }
    
    }
}

module.exports = new tweets();