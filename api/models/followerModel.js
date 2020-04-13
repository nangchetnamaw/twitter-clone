const mongoose = require('mongoose');
const followerSchema= require('../schemas/followers').schema;

class Follower{
    constructor(){
         this.model = mongoose.model('Follower', followerSchema);
    }
    
    async create(followObj){
        return await this.model.create(followObj);
    }

    async delete(criteria={}){
        return await this.model.deleteOne(criteria);
    }
    async find(criteria={}){
        return await this.model.find(criteria);
    }

    async findOne(criteria={}){
        return await this.model.findOne(criteria);
    }

    async getRelation(criteria={}){
        return await this.model.findOne(criteria)
    }

    async getFollowers(criteria={}, columns={}){
        let fields = 'profileImageURL name userhandle bio ';
        let followerData = await this.model.find(criteria, columns).populate('follower', fields);
        return (followerData);
    }
    
    

}

module.exports = new Follower();