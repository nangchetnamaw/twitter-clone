const mongoose = require('mongoose');
//const schema = require('../schemas');
//const followingSchema = mongoose.Schema(schema.following)
//new
const followingSchema = require('../schemas/following').schema;


class Following{
    constructor(){
         this.model = mongoose.model('Following', followingSchema)
    }
    
    async create(followerObj){
        return await this.model.create(followerObj);
    }

    async delete(criteria={}){
        return await this.model.deleteOne(criteria);
    }

    async getAll(criteria={}, coloumns={}){
        let fields = 'profileImageURL email tweetCount followerCount followingCount name userhandle';
        let followingData = await this.model.find(criteria, coloumns).populate('following', fields);
        return (JSON.stringify(followingData));
    }
    
    async getRelation(criteria={}){
        return await this.model.findOne(criteria)
    }
}

module.exports = new Following();