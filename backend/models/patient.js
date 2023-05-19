const mongoose = require("mongoose");

const schema = mongoose.Schema;

const patientSchema = new schema({
    name: {
        type: String,
        required: true
    },

    nic: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    birthdate: {
        type: Date,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    blood: {
        type: String,
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    surgery: {
        type: String,
    },

    allergy: {
        type: String,
    },

    profilePic: {
        type: String,
    },

    password: {
        type: String,
        required: true
    }
})

const patient = mongoose.model("patient", patientSchema);

module.exports = patient;