const mongoose = require('mongoose');
const schema = require('../schemas');
const tweetSchema = require('../schemas/tweet').schema;

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
    async update(criteria={},tweetObj)
    {
        return this.model.updateOne(criteria, tweetObj);
    }
      
    async like(criteria={}, like){
        return this.model.update(criteria, like)
    }
}

module.exports = new Tweet();