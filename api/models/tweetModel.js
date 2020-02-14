const mongoose = require('mongoose');
const schema = require('../schemas');
const tweetSchema = mongoose.Schema(schema.tweets)

class Tweet{
    constructor(){
        this.model = mongoose.model('Tweet', tweetSchema)
    }
    async get(criteria={}){
        return this.model.find(criteria)
    }
    async save(newTweet){
        return this.model.create(newTweet)
    }
}

module.exports = new Tweet();