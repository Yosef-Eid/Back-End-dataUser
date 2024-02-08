
const express = require('express') // import express from express
const app = express()
const mongoose = require('mongoose') // import mongoose from mongoose

const MyData = require("./models/schema") // import Contains all data from input elements stored in the file schema 

let port = 3000 
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public')) // link css file with html file


app.get('/', (req, res) => {
    res.sendFile('./view/index.html', { root: __dirname }) // link html file from folder view
    
})

// Link to the database coming from mongoDb
mongoose.connect('mongodb+srv://yousef:NYa7FaifG5sDdQMI@cluster0.gogt4k0.mongodb.net/all-data?retryWrites=true&w=majority')
.then(() => { 

    // Run the project on port 3000
    app.listen(port, () => {
        console.log('welcome');
    })
})
.catch(err => console.log(err))


// Save data in the database
app.post('/', (req, res) => {
    MyData(req.body).save()

    .then(() => {
        res.redirect('/') //Go to the main path after saving the data
    })
})