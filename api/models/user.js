const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    userhandle: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profileImg: {
      type: String,
      default: null
    },
    joined: {
      type: Date,
      default: Date.now()
    },
    dob: {
      type: Date,
      default: null
    },
    count: {
      followerCount: {
        type: Number,
        default: 0
      },
      followingCount: {
        type: Number,
        default: 0
      }
    }
});

const User = mongoose.model("User", userSchema);

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
module.exports.User = User;
