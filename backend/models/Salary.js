const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salarySchema = new Schema({
    name :{
        type : String,
        required: true //validation
    },

    basicsalary :{
        type : Number,
        required: true //validation
    },
    completedhours :{
        type : Number,
        required: true //validation
    },
    OTsalary :{
        type : Number,
        required: true //validation
    },
     

})

const Salary = mongoose.model("Salary",salarySchema);//table name with lowercase,plural changes

module.exports = Salary;