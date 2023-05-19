const mongoose = require('mongoose')

const ShipmentSchema = new mongoose.Schema({
    shippingNumber: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("shipment", ShipmentSchema)