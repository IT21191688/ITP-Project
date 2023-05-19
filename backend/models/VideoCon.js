const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const CustomerSchema = new Schema({
    name :{
        type : String,
        required: true
    },
    phone:{
        type : Number,
        required: true
    },
    specialist:{
        type : String,
        required: true
    },
    mail:{
        type : String,
        required: true
    },
    date:{
        type : String,
        required: true
    },


})

const Consult = mongoose.model("Consult",CustomerSchema);
module.exports= Consult;