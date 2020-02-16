const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

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
    user = await user.save();
    res.send(user);
});

module.exports = router;