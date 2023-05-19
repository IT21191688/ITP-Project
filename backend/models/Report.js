const mongoose = require('mongoose');//import mongoose package and assign it into const variable
const Schema = mongoose.Schema;//schema is useful to store data of report

//create schema like object(java)
const reportSchema = new Schema({
    ID : {
        type : String,
        required: true//before going on database, check id has/fill value or not
    },
    name : {
        type : String,
        required: true //backend validation
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    doctor:{
        type: String,
        required: true
    }, 
    sampleType:{
        type: String,
        required: true
    }, 
    processedDate:{
        type: String,
        required: true
    },
    TechnologistName : {
        type : String,
        required: true
    },
     filepath:{
       type: String
        
    }, status:{
        type:String
    }
});

const Report = mongoose.model("Report",reportSchema) //pass parameters table name schema name to database
module.exports = Report;