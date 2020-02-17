const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//generate Schema
const Schema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        text: String,
        
        imageURL: String,
        mentions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    
    tags: [
        {
            type: String,
            required: true
        }
    ],
    recentLikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    },
    commentCount: {
        type: Number,
        required: true,
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Likes"
    },
    likeCount: {
        type: Number,
        required: true,
    },  
    retweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Retweet"
    },
    date: {
        type : Date,
        default: Date.now()
    },
    

});



//generate model
const tweetModel = mongoose.model('tweet', Schema);

//router.post('', (req, res) => {})

router.post('/', async (req, res) => {
    // const { text, imageURL, mentions, tags, comments, commentCount } = req.body.content;
    await tweetModel.create(req.body);
    
    res.send('Tweet created successfully');
});

// router.get()

module.exports = router;
