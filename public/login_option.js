const { application } = require("express");
const app = require("express");
console.log("login option loaded");
const studentField = document.querySelector('.student-field');
const driverField = document.querySelector('.driver-field');
const organisationField = document.querySelector('.Organisation-field');


studentField.addEventListener("click", () => {
    localStorage.setItem('userType', 'student');
    app.get('/signup', (req, res) => {
        res.render('Signup')
    });
});

// driverField.addEventListener("click", () => {
//     localStorage.setItem('userType', 'driver');
//     app.get('/signup', (req, res) => {
//         res.render('Signup')
//     });
// });

// organisationField.addEventListener("click", () => {
//     localStorage.setItem('userType', 'org');
//     app.get('/signup', (req, res) => {
//         res.render('Signup')
//     });
// });
