const mongoose = require('mongoose');

// save input value 
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    age: Number,
    country: String,
    gender: String,
});

const userData = mongoose.model('UserData', userSchema)

module.exports =  userData