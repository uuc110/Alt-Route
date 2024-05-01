const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/SignUplogin")

connect.then(()=>{
    console.log("Database connected successfully");
})
.catch(()=>{
    console.log("Database cannot connect");
});

 
// Define the Mongoose schema
const StudentSchema = new mongoose.Schema({
    personalInformation: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        emailAddress: {
            type: String,
            required: true
        },
        studentOrg: {
            type: String,
            required: true
        },
        // country: {
        //     type: String,
        //     required: true
        // },
        // city: {
        //     type: String,
        //     required: true
        // },
        pincode: {
            type: String,
            required: true
        }
    },
    education: {
        enrollmentNumber: {
            type: String,
            required: true
        },
        batchYear: {
            type: String,
            required: true
        },
        class: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        organisation: {
            type: String,
            required: true
        }
    },
    busInformation: {
        // busNumber: {
        //     type: String,
        //     required: true
        // },
        stopDetails: {
            type: String,
            required: true
        },
        Stopaddress: {
            type: String,
            required: true
        }
    },
    // Add more fields as needed for additional steps
});

// const DriverSchema = new mongoose.Schema({
//     personalInformation: {
//         firstName: {
//             type: String,
//             required: true
//         },
//         lastName: {
//             type: String,
//             required: true
//         },
//         phoneNumber: {
//             type: String,
//             required: true
//         },
//         emailAddress: {
//             type: String,
//             required: true
//         }
//     },
//     organisationInformation: {
//         employeeId: {
//             type: String,
//             required: true
//         },
//         organisation: {
//             type: String,
//             required: true
//         },
//         organisationEmail: {
//             type: String,
//             required: true
//         }
//     },
//     vehicleInformation: {
//         busNumber: {
//             type: String,
//             required: true
//         },
//         busModel: {
//             type: String,
//             required: true
//         },
//         busRoute: {
//             type: String,
//             required: true
//         },
//         busCapacity: {
//             type: Number,
//             required: true
//         },
//         numberOfFaculty: {
//             type: Number,
//             required: true
//         },
//         numberOfStudents: {
//             type: Number,
//             required: true
//         },
//         stopDetails: {
//             type: String,
//             required: true
//         },
//         alternateDriver: {
//             type: String,
//             required: true
//         }
//     },
//     // Add more fields as needed for additional steps
// });

const Student = new mongoose.model('Student', StudentSchema);
// const Driver = mongoose.model('Driver', DriverSchema);

// Export the model
module.exports = {Student, /* Driver */};


