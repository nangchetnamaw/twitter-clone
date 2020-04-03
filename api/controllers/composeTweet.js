const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User } = require('../models/signup');
class tweets {
    constructor() {

    }

    async composeTweet(req, res){
        if (!req.file) {
            console.log("No file is available!");
            return res.status(200).send({
                success: false
            });
        } 
        else {
            console.log('File is available!');
           
            try{
                return res.status(200).send("Uploaded");
            }catch(err){
                return res.status(501).send("Some Error Occured");
            }
        }
    
    }
}
module.exports = new tweets();
