const mongoose = require('mongoose');
const like= require('../schemas/likes').schema;
const likeSchema = mongoose.Schema(like);
class likeTweet{
    constructor(){
         this.model = mongoose.model('like', likeSchema);
    }

    async get(criteria={}, columns={}){
        return  await this.model.find(criteria, columns);
    }

    async create(likeObj){
       const obj= await this.model.create(likeObj);
       return obj;
    }

    async updateOne(criteria ={}, updateObj){
        return this.model.updateOne(criteria, updateObj);
    }

    async delete(criteria ={}){
        return await this.model.deleteOne(criteria);
    }
}

module.exports = new likeTweet();