const controller = require('../controllers');
const authenticator = require('../middlewares');

module.exports = (app) => {

    app.post('/tweet', authenticator, controller.composeTweet);
}