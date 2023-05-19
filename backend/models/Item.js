const mongoose = require('mongoose')

const ItemScheme = new mongoose.Schema({
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

module.exports = mongoose.model("item", ItemScheme)