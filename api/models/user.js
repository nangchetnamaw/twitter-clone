const mongoose = require("mongoose");
const Joi = require("joi");
const schemas = require("../schemas");
const userDetails = require("../schemas/userDetails");
function validateUser(user) {
  //for removing unnecessary spaces
  for (let key in user) {
    user[key] = user[key].trim();
  }

  const schema = {
    userhandle: Joi.string()
      .min(3)
      .max(50)
      .required(),

    email: Joi.string()
      .min(5)
      .max(200)
      .required(),

    password: Joi.string()
      .min(5)
      .max(255)
      .required(),

    name: Joi.string()
      .min(2)
      .max(100)
      .required(),

    profileImg: Joi.string().allow(null),

    dob: Joi.string().allow(null)
  };
  return Joi.validate(user, schema);
}

module.exports.validateUser = validateUser;
module.exports.User = userDetails;
