const jwt = require('jsonwebtoken');

authenticator = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token) return res.send(401).send('Invalid token');

    try{
        const payload = jwt.verify(token, config.get('jwtPrivateKey'));    
        req.user = payload;
        next();
    }catch(e){
        res.status(400).send('Invalid Token');
    }
}

module.exports = authenticator;