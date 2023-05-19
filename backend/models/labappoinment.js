const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const labAppoinmentSchema = new Schema({

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
    file_path: {
        type: String

    },
    status: {
        type: String,
        required: true

    },
    date: {
        type: Date
    },
    labTest: {

        type: String,
        required: true
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

const labAppoinment = mongoose.model("labAppoinment", labAppoinmentSchema);

module.exports = labAppoinment;