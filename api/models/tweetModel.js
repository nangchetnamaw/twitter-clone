const mongoose = require('mongoose');
const tweetSchema = require('../schemas/tweet').schema;

class Tweet{
    constructor(){
        this.model = mongoose.model('Tweet', tweetSchema);
    }
    async get(criteria={}){
        return this.model.find(criteria).populate("user", "name userhandle profileImageURL");
    }
    async save(newTweet){
        return this.model.create(newTweet);
    }
    async update(criteria={},tweetObj)
    {
        return this.model.updateOne(criteria, tweetObj);
    }
    async like(criteria={}, like){
        return this.model.update(criteria, like);
    }
    async findOne(criteria={},columns={}){
        return this.model.findOne(criteria, columns);
    }
}

module.exports = new Tweet();