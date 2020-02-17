const controller = require('../controllers');


module.exports = (app) => {

    app.get("/api/tweet", controller.composeTweet.show)
    app.post("/api/tweet", controller.composeTweet.addNewTweet)

    app.get("/api/profile", controller.profile.show)
    app.post("/api/profile/pic/upload", controller.profile.uploadProfilePic)
    app.put("/api/profile/pic/update", controller.profile.updateProfilePic)
    app.put("/api/profile/update", controller.profile.updateData)
    app.put("/api/follow",controller.follow.followUpdate) 
    app.put("/api/unfollow",controller.unfollow.unfollowUpdate)
    app.get("/api/search",controller.profile.searchUser) 
    


    
     

}