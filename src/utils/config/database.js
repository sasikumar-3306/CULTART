const mongoose = require('mongoose');

const dbConString = "mongodb+srv://cultart:cultart123@devcultart.zyvgq.mongodb.net/cultArt";

const dbConnection = async () => {
    await mongoose.connect(dbConString);
} 

module.exports = dbConnection;