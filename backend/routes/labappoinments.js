//import router pacage
const router = require("express").Router();
const { request } = require("express");

//import nodemailer
const nodemailer = require('nodemailer');


let labAppoinment = require("../models/labappoinment");
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
router.route("/addLabAppoinment").post(upload.single("file_path"), (req, res) => {

    res.send(req.file);

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const age = Number(req.body.age);
    const nic = req.body.nic;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const file_path = req.file.filename;
    const status = req.body.status;
    const date = req.body.date;
    const labTest = req.body.labTest;
    const appNo = Number(req.body.appNo);
    const appTime = req.body.appTime;

    const newlabAppoinment = new labAppoinment({
        first_name,
        last_name,
        age,
        nic,
        email,
        telephone,
        file_path,
        status,
        date,
        labTest,
        appNo,
        appTime
    });


    const mailOptions = {
        from: 'medixoehealth@gmail.com',
        to: email,
        subject: 'Appointment details',
        text: `Dear ${first_name},\n\nYour Lab appointment Number is ${appNo}. it has been scheduled for ${date} at ${appTime}.\n\nThank you for choosing our hospital.
        (This is a system generated email)`
    };




    //then() js promice
    newlabAppoinment.save().then(function () {



        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });



        //give response json format
        res.json("Employee added success");




    }).catch(function (err) {

        console.log(err);

    })



})


//read data
router.route("/readlabAppoinment").get(function (req, res) {

    labAppoinment.find().then((labAppoinments) => {

        res.json(labAppoinments);

    }).catch(function (err) {

        console.log(err);

    })
})


//update data
router.route("/updatelabAppoinment/:id").put(async function (req, res) {

    let userId = req.params.id;

    /*
        const name=req.params.name;
        const age=req.params.age;
        const gender=req.params.gender;\
     */

    //destructure
    const { first_name, last_name, age, nic, email, telephone, file_path, status, date, labTest, appNo, appTime } = req.body;

    const updatelabAppoinment = {

        first_name,
        last_name,
        age,
        nic,
        email,
        telephone,
        file_path,
        status,
        date,
        labTest,
        appNo,
        appTime

    }

    const update = await labAppoinment.findByIdAndUpdate(userId, updatelabAppoinment).then(() => {

        res.status(200).send({ status: "Appoinment Status Updated" });

    }).catch(function (err) {

        console.log(err);
        res.status(500).send({ status: "Not updated", error: err.massage });

    })



})


router.route("/deletelabAppoinment/:id").delete(async function (req, res) {
    let userId = req.params.id;

    await labAppoinment.findByIdAndDelete(userId).then(function () {

        res.status(200).send({ status: "Employee" });

    }).catch(function (err) {

        console.log(err);
        res.status(500).send({ status: "Delete unsuccessfull please try again", error: err.massage });

    })

})

//user profile
router.route("/getonelabAppoinment/:id").get(async function (req, res) {
    let userId = req.params.id;

    const user = await labAppoinment.findById(userId).then(function (labAppoinment) {

        res.json(labAppoinment);

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

    const user = await labAppoinment.findById(userNic).then(function (Employee) {

        res.json(labAppoinment);

        // res.status(200).send({ status: "user data fech success", res. });

    }).catch(function () {

        console.log(err);
        res.status(500).send({ status: "error", error: err.massage });

    })
})



//export module
module.exports = router;