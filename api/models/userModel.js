const mongoose = require('mongoose');
const schema = require('../schemas');
const userSchema = require('../schemas/user').schema;

class User{
    constructor(){
        this.model = mongoose.model('User', userSchema)
    }
    async get(criteria={}){
        return this.model.find(criteria)
    }
    async update(criteria={}, updateProfile){
        return this.model.update(criteria, updateProfile)
    }

    async follow(criteria={}, updateObj){
        return this.model.update(criteria, updateObj )
    }

    async unfollow(criteria={}, updateObj){
        return this.model.update(criteria, updateObj )
    }

    async getUsers(criteria={}){
        return this.model.find(criteria, {"name":1, "userHandle":1, _id:0})
    }
}

module.exports = new User();