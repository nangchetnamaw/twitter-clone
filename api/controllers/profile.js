// const model = require('../models');
const { User } = require('../models/signup');
const express = require('express');
const router = express.Router();  //it will append the index.js route with this
const multer  = require('multer');
var upload = multer({ dest: 'assests/' })


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })


class Profile {
    constructor(){

    }

    async show(req,res) {
        const profileData = await model.userModel.get();
        res.send(profileData);
    }

    async updateData(req, res) {
        const updateProfileData = await model.userModel.update({"_id": req.params.id}, 
        {"$set": 
            {
                "name": req.body.name,
                "phoneNo": req.body.phoneNo,
                "dob": req.body.dob
                //add more as required
            },
        }, updateProfileData)
    }

    async updateProfilePic(req, res) {
        const updateProfileImage= await model.userModel.update({"_id": req.params.id}, 
        {"$set": 
            {
                "imageURL": req.body.imageURL
            },
        }, updateProfileImage)
    }

    async uploadProfilePic(req, res) {
        let uploadProfileImage={
            "imageURL": req.body.imageURL
        }
        const profilePic = await model.employee.save(uploadProfilePic)
        res.send(profilePic)
    }

}
router.get('/', async (req, res) => {
    const users = await User.findOne({userhandle: req.body.userhandle});
    res.send(users);
});

module.exports = router; 
