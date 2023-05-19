const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    firstname :{
        type : String,
        required: true //validation
    },
    lastname :{
        type : String,
        required: true //validation
    },
    age :{
        type : Number,
        required: true
    },
    address :{
        type : String,
        required: true //validation
    },
    email :{
        type : String,
        required: true
    },
    mobile :{
        type : Number,
        required: true
    },
    gender :{
        type : String,
        //required: true
    },
    maritalstatus :{
        type : String,
        //required: true //validation
    },
    specialization :{
        type : String,
        //required: true
    },
    experianceduration :{
        type : String,
        //required: true
    },
    previousehospitals :{
        type : String,
        //required: true
    },
    awards :{
        type : String,
        //required: true
    },
    workingdays :{
        type : String,
        required: true
    },

    file_path :{
        type : String,
        //required: true
    }

})

const Doctor = mongoose.model("Doctor",doctorSchema);//table name with lowercase,plural changes

module.exports = Doctor;