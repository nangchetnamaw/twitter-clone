const jwt = require('jsonwebtoken');

authenticator = (req, res, next) => {
    console.log('Authenticating...');
    // const token = req.header('x-auth-token');
    // if(!token) return res.send(401).send('Invalid token');

    // try{
    //     const payload = jwt.verify(token, config.get('jwtPrivateKey'));    
    //     req.user = payload;
    //     next();
    // }catch(e){
    //     res.status(400).send('Invalid Token');
    // }
    next();
}

module.exports = authenticator;