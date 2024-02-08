
const express = require('express') // import express from express
const app = express()
const mongoose = require('mongoose') // import mongoose from mongoose
let port = 3000

const MyData = require("./models/schema") // import Contains all data from input elements stored in the file schema 

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')) // link css file with html file
app.set('view engine', 'ejs'); // run ejs 


app.get('/', (req, res) => {

    // get data from database 
    MyData.find()
        .then((result) => {
            res.render('index.ejs', { dataUser: result }) // link html file from folder views and send data to html file
        })
        .catch((err => "Error:" + err))
})

// Link to the database coming from mongoDb
mongoose.connect('mongodb+srv://yousef:NYa7FaifG5sDdQMI@cluster0.gogt4k0.mongodb.net/all-data?retryWrites=true&w=majority')
    .then(() => {
        // Run the project on port 3000
    })
    .catch(err => console.log(err))

// Save data in the database
app.post('/', (req, res) => {
    MyData(req.body).save()
        .then(() => {
            res.redirect('/') //Go to the main path after saving the data
        }).catch(err => "Error:" + err)
})

// run the project on port 3000
app.listen(port, () => {
    console.log('welcome');
})