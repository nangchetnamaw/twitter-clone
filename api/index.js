const express= require('express');
const bodyParser= require('body-parser')
const app = express();
const database = require('./database/config')
app.use(bodyParser.json())

require('./routes/route.js')(app);


app.listen(3000, () =>{
    console.log("Listening port 3000")
});

app.post("/resume", (req,res) =>{
    console.log(req.body)
    res.send({resume: `resume:${req.body.resume}`, age: `age:${req.body.age}`})
});

// what is middleware ?