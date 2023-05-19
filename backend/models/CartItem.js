const mongoose = require('mongoose')

const CartItemScheme = new mongoose.Schema({
    shippingNumber: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemCode: {
        type: String,
        required: true
    },
    itemQuantity: {
        type: Number,
        required: true
    },
    selectedQuantity: {
        type: Number,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    itemImage: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("cartItem", CartItemScheme)