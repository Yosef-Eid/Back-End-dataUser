
const express = require('express') // import express from express
const app = express()
const mongoose = require('mongoose') // import mongoose from mongoose
let port = 3000

const userData = require("./models/addUserSchema") // import Contains all data from input elements stored in the file schema 

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')) // link css file with html file
app.set('view engine', 'ejs'); // run ejs


// livereload
{
    const path = require("path");
    const livereload = require("livereload");
    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(path.join(__dirname, 'public'));

    const connectLivereload = require("connect-livereload");
    app.use(connectLivereload());

    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    })
}


app.get("/", (req, res) => {
    userData.find()
    .then((data) => {

        res.render("index", {data: data});
    }).catch((err) => console.log(err))

});

app.get("/user/add.html", (req, res) => {
    res.render("user/add")
});

app.get("/user/view.html", (req, res) => {
    res.render("user/view")
});

app.get("/user/edit.html", (req, res) => {
    res.render("user/edit")
});


// Link to the database coming from mongoDb
mongoose.connect('mongodb+srv://yousef:NYa7FaifG5sDdQMI@cluster0.gogt4k0.mongodb.net/all-data?retryWrites=true&w=majority')
    .then(() => {
        // Run the project on port 3000
    })
    .catch(err => "Error conation with database" + err)

// Save data in the database
app.post('/user/add.html', (req, res) => {
    new userData(req.body).save()
        .then(() => {
            res.redirect('/user/add.html') //Go to the main path after saving the data
        }).catch(err => console.log("Error send database:" + err))
})

// run the project on port 3000
app.listen(port, () => {
    console.log('welcome');
})


