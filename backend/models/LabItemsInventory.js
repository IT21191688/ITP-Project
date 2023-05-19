const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const labitems_inventorySchema = new Schema({
    itemID : {
        type : String,
        required: true
    },
    itemname : {
        type : String,
        required: true //backend validation
    },
    expiryDate:{
        type: String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    },
    labManager:{
        type: String,
        required: true
    }, 
    noOfitem:{
        type: Number,
        required: true
    }
});

const LabItemsInventory = mongoose.model("LabItemsInventory",labitems_inventorySchema) //pass parameters table name schema name
module.exports = LabItemsInventory;