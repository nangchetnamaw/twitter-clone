const mongoose = require('mongoose');
const commentSchema = require('../schemas/comments').schema;


class Comment{

    constructor(){
        this.model = mongoose.model('Comment', commentSchema);
    }

    async get(criteria = {}, columns = {}){
        return this.model.findOne(criteria, columns);
    }

    async create(commentObj){
        return await this.model.create(commentObj);
    }

    async updateOne(criteria, updateObj){
        return this.model.updateOne(criteria, updateObj);
    }

    async deleteOne(criteria){
        return this.model.deleteOne(criteria);
    }
}
module.exports = new Comment()