const jwt = require('jsonwebtoken');
const config = require('config');

authenticator = (req, res, next) => {
    console.log('Authenticating...');
    
    const token = req.header('Authorization').replace('Bearer ','');
    console.log(token);

    if(!token) return res.status(401).send('Invalid token');
    try{
        const payload = jwt.verify(token, config.get('jwtPrivateKey'));    
        console.log(payload);
        req.user = payload;
        next();
    }catch(e){
        console.log(e);
        res.status(400).send('Invalid Token');
    }
    next();
}

module.exports = authenticator;