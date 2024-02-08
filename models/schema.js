const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    name: String,
    number: Number,
});

const MyData = mongoose.model('Data', schema)

module.exports =  MyData