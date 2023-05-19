const mongoose = require('mongoose')

const RoomBookSchema = new mongoose.Schema({
    regNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    roomNo: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    admitType: {
        type: String,
        required: true
    },
    feature: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("roomBook", RoomBookSchema)