const express = require("express");
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/signup');

router.post("/", async (req, res) => {
    const { error, value } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    else req.body = value;

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(401).send('Invalid email or password');

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isPassword) return res.status(401).send('Invalid email or password');

    const token = jwt.sign({ userhandle: user.userhandle, email: user.email }, config.get('jwtPrivateKey'));
    res.send({ ...user, 'x-auth-token': token });
});

function validate(user) {
  for (let key in user) {
    user[key] = user[key].trim();
  }

  const schema = {
    email: Joi.string()
      .min(5)
      .max(200)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  console.log(
    "user mil gaya login schema mein",
    user,
    "Joi.validate",
    Joi.validate(user, schema)
  );

  return Joi.validate(user, schema);
}

module.exports = router;
