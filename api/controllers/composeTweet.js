const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const model = require('../models');
const { User } = require('../models/signup');

class tweets {

    constructor() {
    }

    async composeTweet(req, res){
        console.log(req.body.text);
        if (!req.file) {
            console.log("No file is available!");
            return res.status(200).send({
                success: false
            });
        } 
        else {
            console.log('File is available!');
            console.log(req.body.text);
            console.log(req.headers.authorization);
            console.log(req.file.path);
            console.log(model.tokenDecoder(req.headers.authorization));
            let _id = (model.tokenDecoder(req.headers.authorization))._id;
            let tweetObject = {
                "user" : _id,
                "content" : {
                    "text" : req.body.text,
                    "imageURL" : req.file.path
                },
                "date" : Date.now()
            };
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

// //generate model
// const tweetModel = mongoose.model('tweet', Schema);

// //router.post('', (req, res) => {})

// router.post('/', async (req, res) => {
//     // const { text, imageURL, mentions, tags, comments, commentCount } = req.body.content;
//     const user = await User.findOne({userhandle: req.body.user});
//     await tweetModel.create({ ...req.body, user });
    
//     res.send( { ok: 1 } );
// });

// router.get()

module.exports = new tweets();
