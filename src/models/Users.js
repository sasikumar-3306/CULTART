const {Schema, model} = require('mongoose');

const Users = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    dob: {
        type: Date
    },
    gender: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    }
});

module.exports = model('users', Users);