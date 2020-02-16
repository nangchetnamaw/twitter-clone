const model = require('../models')

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
module.exports = new Profile();