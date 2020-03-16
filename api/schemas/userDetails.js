const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    userHandle: {
        type: String,
        max: 40,
        required: true,
        unique: true
    },
    email: {
        type: String,
        max: 40,
        required: true,
        unique: true
    },
    password: {
        type: String,
        max: 255,
        required: true,
    },
    phoneNo: {
        type: String,
        max: 10
    },
    name: {
        type: String,
        max: 40,
        // required: true
    },
    joined: {
        type:Date,
        default: Date.now()
    },
    dob: {
        type: Date
    },
    followerCount:{
        type: Number,
        default: 0
    },
    followingCount:{
        type: Number,
        default: 0
    },
    tweetCount:{
        type: Number,
        default: 0
    },
    imageURL: String,
});
 
// const User= mongoose.model('User', userSchema);
// module.exports = User;