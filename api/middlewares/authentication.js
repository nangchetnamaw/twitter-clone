authenticator = (req, res, next) => {
    console.log('Authenticate...');
    next();
}

module.exports = authenticator;