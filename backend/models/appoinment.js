const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const AppoinmentSchema = new Schema({

    specialization: {

        type: String,
        //required: true

    },
    doctor_name: {

        type: String,
        required: true

    },
    first_name: {

        type: String,
        required: true

    },
    last_name: {

        type: String,
        required: true

    },
    age: {

        type: Number,
        required: true
    },
    nic: {

        type: String,
        required: true

    },
    email: {

        type: String,
        required: true

    },
    telephone: {

        type: String,
        required: true

    },

    status: {

        type: String,
        required: true

    },
    date: {

        type: Date

    },
    appNo: {

        type: Number,
        required: true

    },
    appTime: {

        type: String,
        required: true

    }



})

const Appoinment = mongoose.model("Appoinment", AppoinmentSchema);

module.exports = Appoinment;