const controller = require('../controllers');
const authenticator = require('../middlewares/authentication');

module.exports = (app) => {

    app.post('/tweet', authenticator, controller.composeTweet.composeTweet);

    //new
    app.post('/signup',controller.user.signup);
    app.post('/login',controller.user.login);
    app.get('/profile',authenticator,controller.user.getProfile);
    //new
    app.post('/follow',controller.follow.follow);
    app.post('/unfollow',controller.follow.unfollow);

}