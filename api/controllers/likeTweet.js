const model = require('../models')

class LikeTweet {
    constructor(){

    }

    async addNewTweet(req, res) {
        let newTweet={
            user: req.body.user,
            content: {
                text: req.body.content.text,
                imageURL: req.body.content.imageURL,
                mentions: req.body.content.mentions,
                recentLikes: req.body.content.recentLikes,
                tags: req.body.content.tags,
                date: req.body.content.date,
                comments: req.body.content.comments,
                commentCount: req.body.content.commentCount,
                likes: req.body.content.likes,
                likeCount: req.body.content.likeCount

            },
        }
        const tweet = await model.employee.save(newTweet)
        res.send(tweet)
    }

    async show(req,res){
        const employee = await model.employee.get({"_id": req.params.id})
        res.send(employee);
    }
}
module.exports = new LikeTweet();