const mongoose = require('mongoose');
const schema = require('../schemas/followers');
const followerSchema = mongoose.Schema(schema.follower)

class Follower{
    constructor(){
        this.model = mongoose.model('Follower', followerSchema)
    }
    
    async follow(followerObj){
        return await this.model.create(followerObj )
    }

}

module.exports = new Follower();