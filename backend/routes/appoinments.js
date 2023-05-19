//import router pacage
const router = require("express").Router();

//import node corn
const cron = require('node-cron');

//import nodemailer
const nodemailer = require('nodemailer');


const { request } = require("express");
let Appoinment = require("../models/appoinment");
//import models student js

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Appoinment_slip');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}




let upload = multer({ storage: storage });

//Create a transporter object
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'medixoehealth',
        pass: 'boupdtqanzqxslcg'
    }
});





//add data 
router.route("/addAppoinment").post(upload.single("file_path"), (req, res) => {

    res.send(req.file);

    const specialization = req.body.specialization;
    const doctor_name = req.body.doctor_name;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const age = Number(req.body.age);
    const nic = req.body.nic;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const status = req.body.status;
    const date = req.body.date;
    const appNo = Number(req.body.appNo);
    const appTime = req.body.appTime;


    const newAppoinment = new Appoinment({
        specialization,
        doctor_name,
        first_name,
        last_name,
        age,
        nic,
        email,
        telephone,
        status,
        date,
        appNo,
        appTime

    });

    const mailOptions = {
        from: 'medixoehealth@gmail.com',
        to: email,
        subject: 'Appointment details',
        text: `Dear ${first_name},\n\nYour appointment Number is ${appNo}. it has been scheduled for ${date} at ${appTime}.\n\nThank you for choosing our hospital.
        (This is a system generated email)`
    };


    //then() js promice
    newAppoinment.save().then(function () {

        //send mail
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        //give response json format
        res.json("Appoinment added success");

    }).catch(function (err) {

        console.log(err);

    })


})


//read data
router.route("/readAppoinment").get(function (req, res) {

    Appoinment.find().then((Appoinments) => {

        res.json(Appoinments);

    }).catch(function (err) {

        console.log(err);

    })
})


//update data
router.route("/updateAppoinment/:id").put(async function (req, res) {

    let userId = req.params.id;

    /*
        const name=req.params.name;
        const age=req.params.age;
        const gender=req.params.gender;\
     */

    //destructure
    const { specialization, doctor_name, first_name, last_name, age, nic, email, telephone, status, date, appNo, appTime } = req.body;

    const updateAppoinment = {

        specialization,
        doctor_name,
        first_name,
        last_name,
        age,
        nic,
        email,
        telephone,
        status,
        date,
        appNo,
        appTime

    }

    const update = await Appoinment.findByIdAndUpdate(userId, updateAppoinment).then(() => {

        res.status(200).send({ status: "Appoinment Status Updated" });

    }).catch(function (err) {

        console.log(err);
        res.status(500).send({ status: "Not updated", error: err.massage });

    })



})


router.route("/deleteAppoinment/:id").delete(async function (req, res) {
    let userId = req.params.id;

    await Appoinment.findByIdAndDelete(userId).then(function () {

        res.status(200).send({ status: "Employee" });

    }).catch(function (err) {

        console.log(err);
        res.status(500).send({ status: "Delete unsuccessfull please try again", error: err.massage });

    })

})

//user profile
router.route("/getoneAppoinment/:id").get(async function (req, res) {
    let userId = req.params.id;

    const user = await Appoinment.findById(userId).then(function (Appoinment) {

        res.json(Appoinment);

        // res.status(200).send({ status: "user data fech success", res. });

    }).catch(function () {

        console.log(err);
        res.status(500).send({ status: "error", error: err.massage });

    })
})

//export module
module.exports = router;


//get data using nic
router.route("/getone/:nic").get(async function (req, res) {
    let userNic = req.params.nic;

    const user = await Employee.findById(userNic).then(function (Employee) {

        res.json(Appoinment);

        // res.status(200).send({ status: "user data fech success", res. });

    }).catch(function () {

        console.log(err);
        res.status(500).send({ status: "error", error: err.massage });

    })
})


//read data
router.route("/getReportDetails/:dname").get(function (req, res) {
    let dname = req.params.dname;
    Appoinment.findById(dname).then((Appoinments) => {

        res.json(Appoinments);

    }).catch(function (err) {

        console.log(err);

    })
})






//export module
module.exports = router;