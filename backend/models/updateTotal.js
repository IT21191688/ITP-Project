const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const updateTotSchema = new Schema({

    oderID: {
        type: String,
        required: true
    },
    totalFee: {
        type: Number,
        required: true
    }
})

const upadteTot = mongoose.model("upadteTot", updateTotSchema);

module.exports = upadteTot;