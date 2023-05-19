const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const CustomerSchema = new Schema({
    name :{
        type : String,
        required: true
    },
    age:{
        type : Number,
        required: true
    },
    gender:{
        type : String,
        required: true
    },
    mail:{
        type : String,
        required: true
    },
    inquiry:{
        type : String,
        required: true
    },
    message:{
        type : String,
        required: true
    },

})

const Customer = mongoose.model("Customer",CustomerSchema);
module.exports= Customer;