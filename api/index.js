const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const authenticate = require('./middlewares/authentication');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');

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

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening at port ${port}`));
