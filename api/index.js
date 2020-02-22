const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');

//User Imports
const userRoutes = require('./routes/user');
const tweetRoutes = require('./routes/tweet');
const followRoutes = require('./routes/follow');

if(!config.get('jwtPrivateKey')){
    console.log(config.get('jwtPrivateKey'));
    console.error('FATAL ERROR: secretKey not set');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/twitter').then(() => console.log('MongoDb connected')).catch(err => console.error('Error occured while connecting to db', err));

app.use(cors())
app.use(express.json());

//Routes
app.use('/api/user', userRoutes);
app.use('/api/tweet', tweetRoutes);
app.use('/api/follow', followRoutes);

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening at port ${port}`));

