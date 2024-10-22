const mongoose = require('mongoose');

const Artist = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    dob: {
        type: String
    },
    gender: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    },
    qualification: {
        type: String
    },
    specialSkill: {
        type: [String]
    }
}, {
    timestamps: true,
    collection: 'artist'
});

module.exports = mongoose.model('artist', Artist);