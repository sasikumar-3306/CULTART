const {Schema, model} = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Users = new Schema({
    firstName: {
        type: String,
        minlength: 4,
        maxlength: 50,
        required: [true, 'first name is required!']
    },
    lastName: {
        type: String,
        maxlength: 50,
    },
    dob: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    phone: {
        type: String,
        minLength: 10
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'Try another email address'],
        required: true,
        validate(value){
            const isEmailValid = validator.isEmail(value);
            if(!isEmailValid){
                throw new Error('Invalid email address');
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            const isItStrongPassword = validator.isStrongPassword(value);
            if(!isItStrongPassword){
                throw new Error('Password not much stronger');
            }
        }
    },
    status: {
        type: Number,
        enum: [0, 1],
        default: 1
    }
},{
    timestamps: true
});

Users.methods.validatePassword = async function(passwordByUser){
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordByUser, user.password);
    return isPasswordValid;
}

Users.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY);
    return token;
}

module.exports = model('users', Users);