document.addEventListener('DOMContentLoaded', function () {
    console.log('sample test');
    const studentField = document.querySelector('.student-field');
    const driverField = document.querySelector('.driver-field');
    const organisationField = document.querySelector('.Organisation-field');

    studentField.addEventListener("click", () => {
        localStorage.setItem('userType', 'student');
        window.location.href = '/signup'; 
    });

    driverField.addEventListener("click", () => {
        localStorage.setItem('userType', 'driver');
        window.location.href = '/signup';
    });

    organisationField.addEventListener("click", () => {
        localStorage.setItem('userType', 'org');
        window.location.href = '/signup';
    });
});