const jwt = require('jsonwebtoken');
const config = require('config');

authenticator = (req, res, next) => {

    const token = req.header('Authorization').replace('Bearer ','');
    if(!token) return res.status(401).send('Invalid token');

    try{
        const payload = jwt.verify(token, config.get('jwtPrivateKey'));    
        req.user = payload;
        next();
    }catch(e){
        res.status(401).send('Invalid Token');
    }
}

module.exports = authenticator;