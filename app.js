
const express = require('express') // import express from express
const app = express()
const mongoose = require('mongoose') // import mongoose from mongoose
let port = 3000

const userData = require("./models/addUserSchema") // import Contains all data from input elements stored in the file schema 

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')) // link css file with html file
app.set('view engine', 'ejs'); // run ejs

const methodOverride = require('method-override')
app.use(methodOverride('_method'))


// format time and date
var moment = require('moment');


// Link to the database coming from mongoDb
mongoose.connect('mongodb+srv://yousef:NYa7FaifG5sDdQMI@cluster0.gogt4k0.mongodb.net/all-data?retryWrites=true&w=majority')
    .then(() => {
        // run the project on port 3000
        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        })
    })
    .catch(err => "Error conation with database" + err)

// get data from server
app.get("/", (req, res) => {
    userData.find()
        .then((data) => {
            res.render("index", { data: data, moment: moment });
        }).catch((err) => console.log(err))

});

app.get("/user/add.html", (req, res) => {
    res.render("user/add")
});

app.get("/edit/:id", (req, res) => {
    userData.findById(req.params.id)
        .then((user) => {
            res.render("user/edit", { user: user })
        }).catch((err) => { console.log(err); })

});

// show details data users
app.get('/user/:id', (req, res) => {
    userData.findById(req.params.id)
        .then((result) => {
            res.render("user/view", { detailsUser: result, moment: moment });
        }).catch((err) => { console.log(err); })
})

// Save data in the database
app.post('/user/add.html', (req, res) => {
    new userData(req.body).save()
        .then(() => {
            res.redirect('/user/add.html') //Go to the main path after saving the data
        }).catch(err => console.log("Error send database:" + err))
})

// app.get('user/edit/:id', (req, res) => {
//     userData.findById(req.params.id)
//         .then((edit) => {
//             console.log(edit);
//             res.render('/user/edit')

//         }).catch(err => console.log(err))

// })


// npm install method-override ??????
// delete database
app.delete('/:id', (req, res) => {
    userData.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))
})

app.delete('/edit/:id', (req, res) => {
    userData.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))
})



