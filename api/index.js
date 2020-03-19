const express = require('express');
const app = express();
const cors = require('cors');
const config = require('config');
const databaseConfig = require('./database/config');
// const authenticate = require('./middlewares/authentication');


// --------------------NEEDED----------------------------
//User Imports

// const userRoutes = require('./routes/user');
// const tweetRoutes = require('./routes/tweet');
// const followRoutes = require('./routes/follow');

if(!config.get('jwtPrivateKey')){
    console.log(config.get('jwtPrivateKey'));
    console.error('FATAL ERROR: secretKey not set');
    process.exit(1);
}

// mongoose.connect('mongodb://localhost/twitter').then(() => console.log('MongoDb connected')).catch(err => console.error('Error occured while connecting to db', err));

app.use(cors())
app.use(express.json());

require('./routes')(app);

// ------------------------NEEDED--------------------------
//Routes
// app.use('/api/user', userRoutes);
// app.use('/api/tweet', authenticate, tweetRoutes);
// app.use('/api/follow', authenticate, followRoutes);


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening at port ${port}`));

