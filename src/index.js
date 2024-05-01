'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const { Student, /* Driver */ } = require('./config');
const { log } = require('console');


const app = express();
// static file like css
app.use(express.static("public"))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('loginOption')
});

app.get('/home', (req, res) => {
    res.render('home')
});

app.get('/login', (req, res) => {
    res.render('signIn')
});


app.get('/signup', (req, res) => {
    res.render('Signup');
});

// Register a new student

// app.post('/drivers', async (req, res) => {
//     try {
//         const driver = new Driver(req.body); // Create a new Driver instance with the request body
//         const savedDriver = await driver.save(); // Save the driver to the database
//         res.status(201).json(savedDriver); // Respond with the saved driver
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
//     res.redirect('/home');
// });

app.post('/signup', async (req, res) => {
    try {
        console.log(req.body)
        const student = new Student(req.body);
        const savedStudent = await student.save();
        res.redirect('/home');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Check of already existing user

// const existingUser = await Student.findOne({
//     emailAddress: req.body.emailAddress
// });

// if (existingUser) {
//     return res.status(400).json({ message: 'User already exists' });
// }

const port = 5500;
app.listen(port, () => console.log(`Server started on port ${port}`));
