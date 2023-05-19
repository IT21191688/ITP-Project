const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    dateTime: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    paidVia: {
        type: String,
        required: true
    },
    payersName: {
        type: String,
        required: true
    },
    nicOrPassport: {
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
    address: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("payments", PaymentSchema)