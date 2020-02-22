const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId = {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    followerId = {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Follow = mongoose.model('Follow', schema);

module.exports = Follow;