const validator = require('validator');

const validateSignupData = (req) =>{
    const {firstName, email, password} = req.body;

    if(!firstName){
        throw new Error('First name is required');
    }
    else if(!validator.isEmail(email)){
        throw new Error('Invalid email address!!');
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error('Password not much stronger!!')
    }
}

module.exports = {validateSignupData};