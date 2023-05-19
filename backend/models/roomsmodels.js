const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({

    roomnumber:{
        type:String,
        required:true
    },
    roomcategory:{
        type:String,
        required:true
    },
    roomstatus:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Rooms',roomSchema);

