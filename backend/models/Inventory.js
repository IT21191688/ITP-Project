const mongoose = require('mongoose')

const InventorySchema = new mongoose.Schema({
    itemNo: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    noOfItems: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("inventory", InventorySchema)