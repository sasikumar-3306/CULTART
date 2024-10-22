const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const isUser = async (req, res, next) => {
    try{
        const {accessToken: token} = req.cookies;
        
        const decryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decryptToken) {
            res.status(401).send('Unauthorized user credentials given!!');
        }

        const user = await Users.findOne({_id: decryptToken._id, status: 1});
        if(!user){
            throw new Error('User not exist!');
        }

        req.user = user;
        next();
    }
    catch(error){
        res.status(400).send('Error: '+ error);
    }
}

module.exports = {isUser};