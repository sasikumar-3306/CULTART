const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const dbConnection = require('./config/database');
const {validateSignupData} = require('./utils/validator');
const {isUser} = require('./middlewares/auth');

const Users = require('./models/Users');
const Artist = require('./models/Artist');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    try{
        validateSignupData(req);
        
        const {firstName, lastName, dob, gender, phone, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const signupData = new Users({
            firstName,
            lastName,
            dob, 
            gender,
            phone,
            email,
            password: hashedPassword
        }); 
        await signupData.save();
        res.send("User added successfully");
    }
    catch(error){
        res.status(400).send('Error : ' + error);
    }
});

app.post('/signin', async (req, res) =>{
    try {
        const {email, password} = req.body;
    
        const user = await Users.findOne({email: email, status: 1});
        if(!user){
            throw new Error('Invalid credentials!');
        }
    
        const isPasswordValid = await user.validatePassword(password);
        if(!isPasswordValid){
            throw new Error('Invalid credentials!');
        }

        const accessToken = await user.getJWT();

        res.cookie('accessToken', accessToken);
        res.send('Signin successfull.');
    }
    catch(error) {
        res.status(400).send('Error: '+error);
    }
});

app.post("/artist/signup", async (req, res) => {
    try{
        const signupData = new Artist(req.body);
        await signupData.save();
        res.send("Artist added successfully");
    }
    catch(error){
        res.send(400, error+' something went wrong')
    }
});

app.get("/profile", isUser, async (req, res) => {
    try{
        const data = req.user;
        res.send(data);
    }
    catch(error){
        res.status(400).send(error + ' something went wrong');
    }
});

app.patch("/profile", isUser, async (req, res) => {
    try {
        const data = req.user;
        res.send(data);
    }
    catch(error){
        res.status(400).send(error + ' something went wrong');
    }
});

dbConnection().then((con)=>{
    app.listen(3000, ()=>{
        console.log('server port 3000 now listening...');
    });
}).catch(console.error);