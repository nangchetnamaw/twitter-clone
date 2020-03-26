const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User } = require('../models/signup');


// //generate Schema
// const Schema = mongoose.Schema({

//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     content: {
//         text: String,
        
//         imageURL: String,
//         mentions: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "User"
//             }
//         ]
//     },
    
//     tags: [
//         {
//             type: String,
//             required: true
//         }
//     ],
//     recentLikes: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         }
//     ],
//     comments: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Comments"
//     },
//     commentCount: {
//         type: Number,
//         default: 0,
//         required: true,
//     },
//     likes: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Likes"
//     },
//     likeCount: {
//         type: Number,
//         default: 0,
//         required: true,
//     },  
//     retweet: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Retweet"
//     },
//     date: {
//         type : Date,
//         default: Date.now()
//     },
    

// });

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
            console.log(req.file);
            console.log(req.file.path);
            // console.log(req.headers.token);
            // let postObj = {
            //     ownerId: req.body.ownerId,
            //     url: req.file.path.substring(43),
            //     caption: req.body.caption,
            //     createdAt: Date.now()
            // };

            // console.log(postObj.url);
            try{
                // const tempObj = await model.posts.save(postObj);
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
