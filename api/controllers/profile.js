const model = require('../models');
const { User } = require('../models/signup');
const express = require('express');
const router = express.Router();  //it will append the index.js route with this
const multer  = require('multer');
const fs  = require('fs');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads/images')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
   
//   var upload = multer({ storage: storage })

var app = express();
//app.set('view engine', 'ejs');
 
app.get('/', (req, res) => {
    res.render('index');
});
 
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now()+file.originalname);   
        //appends the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC. to start of original file name
    }
});
var upload = multer({storage: storage}).array('files', 12); //can upload a max of 12 files at once
app.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong:(");
        }
        res.end("Upload completed.");
    });
})
 
// app.get('/',function(req,res){
//     res.sendFile(__dirname + "/index.html");
// });
 
// app.post('/api/photo',function(req,res){
//   upload(req,res,function(err) {
//       if(err) {
//           return res.end("Error uploading file.");
//       }
//       res.end("File is uploaded");
//   });
// });
 
//app.listen(3000);


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

module.exports = router;