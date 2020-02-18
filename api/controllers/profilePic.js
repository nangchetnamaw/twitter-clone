const express = require('express');
const multer  = require('multer');
const fs  = require('fs');
 
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = '../postsDb';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
        //appends the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC. to start of original file name
    }
});
let upload = multer({storage: storage});


