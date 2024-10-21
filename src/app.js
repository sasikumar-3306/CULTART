const express = require('express');
const dbConnection = require('./utils/config/database');
const Users = require('./models/Users');

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const signupData = new Users(req.body); 
    try{
        await signupData.save();
        res.send("user added successfully");
    }
    catch(error){
        res.send(400, error+' something went wrong')
    }
});

dbConnection().then((con)=>{
    app.listen(3000, ()=>{
        console.log('server port 3000 now listening...');
    });
}).catch(console.error);