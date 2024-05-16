'use strict';

console.log('long 3 js');

var next_click = document.querySelectorAll(".next_button");
var main_form = document.querySelectorAll(".main");
var step_list = document.querySelectorAll(".progress-bar li");
var num = document.querySelector(".step-number");
const Studentcurrentuser = document.querySelector('.CurrentUser');
const Drivercurrentuser = document.querySelector('.DriverUser');

const usertypeValue = localStorage.getItem('userType');

let formnumber = 0;

let isStudent = usertypeValue === 'student' ? true : false; // Use the retrieved value

if (usertypeValue === 'student') {
    Studentcurrentuser.style.display = 'block';
    Studentcurrentuser.classList.add('student-i');
} else {
    Drivercurrentuser.style.display = 'block';
    Drivercurrentuser.classList.add('driver-i');
}

// Function to show/hide driver fields
function toggleDriverFields(show) {
    var driverFields = document.querySelectorAll('.driver-field');
    driverFields.forEach(function(field) {
        if (show) {
            field.style.display = 'block';
        } else {
            field.style.display = 'none';
        }
    });
}

// Event listener for toggling between student and driver forms
document.querySelectorAll('input[name="user-role"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        isStudent = (radio.value === 'student');
        toggleDriverFields(!isStudent);
        updateProgressBar();
    });
});

next_click.forEach(function(next_click_form) {
    next_click_form.addEventListener('click', function() {
        formnumber++; // Increment the form number first
        updateform(); // Update the form to show the next section
        if (!validateform()) { // Validate the form after making the section visible
            formnumber--; // If validation fails, decrement the form number
            return false;
        }
        progress_forward();
        contentchange();
    });
    console.log("next is being clicked")
});

var back_click = document.querySelectorAll(".back_button");
back_click.forEach(function(back_click_form) {
    back_click_form.addEventListener('click', function() {
        formnumber--;
        updateform();
        progress_backward();
        contentchange();
    });
});

var username = document.querySelector("#user_name");
var shownname = document.querySelector(".shown_name");

var submit_click = document.querySelectorAll(".submit_button");
submit_click.forEach(function(submit_click_form) {
    submit_click_form.addEventListener('click', function() {
        shownname.innerHTML = username.value;
        formnumber++;
        updateform();
    });
});

var heart = document.querySelector(".fa-heart");
heart.addEventListener('click', function() {
    heart.classList.toggle('heart');
});

var share = document.querySelector(".fa-share-alt");
share.addEventListener('click', function() {
    share.classList.toggle('share');
});

function updateform() {
    const studentForms = document.querySelectorAll('.container:not(.driver-signup) .main');
    const driverForms = document.querySelectorAll('.container.driver-signup .main');

    // Remove the 'active' class from all forms
    studentForms.forEach(form => form.classList.remove('active'));
    driverForms.forEach(form => form.classList.remove('active'));

    if (isStudent) {
        // If the user is a student, show the corresponding form section
        studentForms[formnumber].classList.add('active');
    } else {
        // If the user is a driver, show the corresponding form section
        driverForms[formnumber].classList.add('active');
    }
}

function progress_forward() {
    num.innerHTML = formnumber + 1;
    step_list[formnumber].classList.add('active');
}

function progress_backward() {
    var form_num = formnumber + 1;
    step_list[form_num].classList.remove('active');
    num.innerHTML = form_num;
}

var step_num_content = document.querySelectorAll(".step-number-content");

function contentchange() {
    step_num_content.forEach(function(content) {
        content.classList.remove('active');
        content.classList.add('d-none');
    });
    step_num_content[formnumber].classList.add('active');
}

function validateform() {
    let validate = true;
    let validateInputs;

    if (isStudent) {
        // Target the student form inputs
        const studentForm = document.querySelector('.container:not(.driver-signup) .main.active');
        validateInputs = studentForm.querySelectorAll('input[required]');
    } else {
        // Target the driver form inputs
        const driverForm = document.querySelector('.container.driver-signup .main.active');
        validateInputs = driverForm.querySelectorAll('input[required]');
    }

    validateInputs.forEach(function(validateInput) {
        validateInput.classList.remove('warning');
        if (validateInput.value.length === 0) {
            validate = false;
            validateInput.classList.add('warning');
        } else {
            validateInput.setCustomValidity('');
        }
    });

    return validate;
}

function updateProgressBar() {
    step_list.forEach(function(step) {
        step.classList.remove('active');
    });
    if (isStudent) {
        step_list[0].classList.add('active');
    } else {
        step_list[1].classList.add('active');
    }
}

// Show/hide the appropriate form based on the user's role
var studentSignupForm = document.querySelector('.container:not(.driver-signup)');
var driverSignupForm = document.querySelector('.container.driver-signup');

if (isStudent) {
    studentSignupForm.style.display = 'flex';
    driverSignupForm.style.display = 'none';
} else {
    studentSignupForm.style.display = 'none';
    driverSignupForm.style.display = 'flex';
}

// window.location.href = '/';




