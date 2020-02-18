const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const {User, validateUser} = require('../models/signup');

router.post('/', async (req, res) => {
    const { error, value } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    else req.body = value;

    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if(user) return res.status(400).send('User with this email id is already registered');

    user = await User.findOne({ userhandle: req.body.userhandle });
    console.log(user);
    if(user) return res.status(400).send('User with this user handle is already registered');

    const { userhandle, email, password, name, mobile, dob } = req.body;
    user = new User({ userhandle, email, password, name, mobile, dob });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    console.log(user, 'Line28@routes/signup.js');
    user = await user.save();

    const token = jwt.sign({ userhandle: user.userhandle, email: user.email, name: user.name }, config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).send(user);
});

module.exports = router;