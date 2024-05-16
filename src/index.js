'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const axios = require('axios');
const { Student, Driver, DriverRoutes } = require('./config');
const { log } = require('console');


const app = express();

app.use(express.urlencoded({ extended: true }));

// static file like css
app.use(express.static("public"))

app.set('view engine', 'ejs');

app.get('/loginType', (req, res) => {
    res.render('loginOption')
});

app.get('/', (req, res) => {
    res.render('landingpage')
});

app.get('/home', (req, res) => {
    res.render('home')
});

app.get('/login', (req, res) => {
    res.render('signin')
});


app.get('/signup', (req, res) => {
    res.render('Signup');
});



// Register a new student

// app.post('/signup', async (req, res) => {
//     try {
//         const driver = new Driver(req.body); // Create a new Driver instance with the request body
//         const savedDriver = await driver.save(); // Save the driver to the database
//         res.status(201).json(savedDriver); // Respond with the saved driver
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
//     res.redirect('/home');
// });

// app.post('/signup', async (req, res) => {
//     try {
//         console.log(req.body)
//         const student = new Student(req.body);
//         const savedStudent = await student.save();
//         res.redirect('/home');
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

app.post('/signup', async (req, res) => {
    try {
        console.log(req.body); // Log the received data for debugging
        // Check if the request is for a driver or a student
        if (req.body.userType === 'driver') {
            const driver = new Driver(req.body);
            const savedDriver = await driver.save();
            res.redirect('/home');
        } else if (req.body.userType === 'student') {
            const student = new Student(req.body);
            const savedStudent = await student.save();
            res.redirect('/home');
        } else {
            // Handle invalid or missing userType
            res.status(400).json({ message: 'Invalid user type' });
            // differentiate between if its invalid of missing UserType
            
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// For Routes of the driver

app.get('/add-route', async (req, res) => {
    let details = [
        {location: 'G-7 : Palasia, Indore', orderId: 'Rohit Patel', time: '9:45 AM, Thursday', lat: 22.7196, lng: 75.8577},
        {location: 'G-13 : MG Road, Indore', orderId: 'Sneha Verma', time: '10:00 AM, Thursday', lat: 22.7244, lng: 75.8838},
        {location: 'G-19 : RNT Marg, Indore', orderId: 'Priya Singh', time: '10:20 AM, Thursday', lat: 22.7164, lng: 75.8765}
    ];

    for (let detail of details) {
        // Get the route from the origin to the destination using the Google Maps Directions API
        let response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${detail.lat},${detail.lng}&destination=22.7237757,75.8281253&key=AIzaSyDbguvtFyOsyb1gauZHSTM6ZfA77PlE5yg`);

        if (response.data.status === 'OK') {
            let routeCoordinates = response.data.routes[0].overview_polyline.points; // Get the route coordinates

            // Save the route to the database
            const driverRoute = new DriverRoutes({
                driverId: detail.orderId,
                origin: { lat: detail.lat, lng: detail.lng }, // Origin coordinates
                destination: { lat: 22.7237757, lng: 75.8281253 }, // Acropolis
                routeCoordinates: routeCoordinates
            });

            driverRoute.save(function(err) {
                if (err) console.log(err);
                console.log('Driver route saved successfully');
            });
        } else {
            console.log('Failed to get directions:', response.data.status);
        }
    }

    res.send('Routes added successfully');
});


const port = 5500;
app.listen(port, () => console.log(`Server started on port ${port}`));
