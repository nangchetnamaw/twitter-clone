const express = require('express');
const app = express();
const cors = require('cors');
const config = require('config');
const bodyParser=require('body-parser');
const databaseConfig = require('./database/config');
// const authenticate = require('./middlewares/authentication');

if(!config.get('jwtPrivateKey')){
    console.log(config.get('jwtPrivateKey'));
    console.error('FATAL ERROR: secretKey not set');
    process.exit(1);
}

app.use(bodyParser.json());
app.use(cors())
app.use(express.json());
require('./routes/index')(app);


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening at port ${port}`));