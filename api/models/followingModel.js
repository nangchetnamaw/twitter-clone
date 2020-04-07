const mongoose = require('mongoose');
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
    
    async find(criteria={}){
        return await this.model.find(criteria);
    }

    async getFollowing(criteria={}, columns={}){
        let fields = 'profileImageURL name userhandle bio ';
        let followingData = await this.model.find(criteria, columns).populate('following', fields);
        return (followingData);
    }
    
    async getRelation(criteria={}){
        return await this.model.findOne(criteria)
    }
}

module.exports = new Following();