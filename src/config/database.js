const mongoose = require('mongoose');

const dbConString = process.env.DB_CONNECTION_STRING;

const dbConnection = async () => {
    await mongoose.connect(dbConString);
} 

module.exports = dbConnection;