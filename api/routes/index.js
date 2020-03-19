const controller = require('../controllers');
const authenticator = require('../middlewares/authentication');

module.exports = (app) => {

    app.post('/tweet', authenticator, controller.composeTweet.composeTweet);
}