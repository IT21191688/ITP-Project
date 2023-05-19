const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pharmacySchema = new Schema({

    orderID: {
        type: String,
        
    },

    title: {
        type: String,
        
    },
    name: {
        type: String,
        required:true
    },
    age: {
        type: Number,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    telephone: {
        type: String,
        required:true
    },
    town: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    prescription: {
        type: String
    },
    status: {
        type: String
    }
})

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);

module.exports = Pharmacy;