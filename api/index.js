const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const authenticate = require('./middlewares/authentication');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');

const searchRoutes = require('./controllers/profile');

const followRoutes = require('./controllers/follow');

const unfollowRoutes = require('./controllers/unfollow');

// const followRoutes = require('./controllers/follow');
const composeTweet = require('./controllers/composeTweet');

const profileRoute = require('./controllers/profile');

const tweetsRoutes = require('./controllers/tweets');


// const searchRoutes = require('./controllers/profile');

// const followRoutes = require('./controllers/follow');

const likeRoute = require('./controllers/likeTweet');
const unlikeRoute = require('./controllers/unlikeTweet');
if(!config.get('jwtPrivateKey')){
    console.log(config.get('jwtPrivateKey'));
    console.error('FATAL ERROR: secretKey not set');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/twitter').then(() => console.log('MongoDb connected')).catch(err => console.error('Error occured while connecting to db', err));

app.use(cors())
app.use(express.json());
app.use(authenticate);

app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);

app.use('/api/follow', followRoutes);

app.use('/api/unfollow', unfollowRoutes);

// app.use('/api/follow', followRoutes);
app.use('/api/tweet', composeTweet);

app.use('/api/profile', profileRoute);

app.use('/api/search', searchRoutes);
app.use('/api/feed/:parameter', tweetsRoutes);

// app.use('/api/search', searchRoutes);
// app.use('/api/follow', followRoutes);



app.use('/api/like', likeRoute);
app.use('/api/unlike', unlikeRoute);

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening at port ${port}`));

