const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const blood_reportSchema = new Schema({
    ID : {
        type : String,
        required: true
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
    WBC : {
        type : String,
        required: true
    },
    NEUT : {
        type : String,
        required: true
    },
    LYMPH : {
        type : String,
        required: true
    },
    MONO : {
        type : String,
        required: true
    },
    EO : {
        type : String,
        required: true
    },
    BASO : {
        type : String,
        required: true
    },
    RBC : {
        type : String,
        required: true
    },
    HGB : {
        type : String,
        required: true
    },
    HCT : {
        type : String,
        required: true
    },
    MCV : {
        type : String,
        required: true
    },
    status : {
        type : String,
    }


});

const BloodReport = mongoose.model("BloodReport",blood_reportSchema) //pass parameters table name schema name
module.exports = BloodReport;