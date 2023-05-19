const router = require("express").Router();

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const Doctor = require("../models/Doctor");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './DoctorImage');
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

router.route("/add").post(upload.single("file_path"), (req, res) => {
    res.send(req.file);

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const age = Number(req.body.age);
    const address = req.body.address;
    const email = req.body.email;
    const mobile = Number(req.body.mobile);
    const gender = req.body.gender;
    const maritalstatus = req.body.maritalstatus;
    const specialization = req.body.specialization;
    const experianceduration = req.body.experianceduration;
    const previousehospitals = req.body.previousehospitals;
    const awards = req.body.awards;
    const workingdays = req.body.workingdays;
    const file_path = req.file.filename;



    const newDoctor = new Doctor({
        //auto generated ID
        firstname,
        lastname,
        age,
        address,
        email,
        mobile,
        gender,
        maritalstatus,
        specialization,
        experianceduration,
        previousehospitals,
        awards,
        workingdays,
        file_path
    })

    newDoctor.save().then(() => {
        res.json("Doctor Added")
    }).catch((err) => {

        console.log(err);
    })


})

router.route("/").get((req, res) => {

    Doctor.find().then((doctors) => {
        res.json(doctors)
    }).catch((err) => {
        console.log(err)
    })


})

router.route("/update/:id").put(async (req, res) => {

    let userId = req.params.id;

    //destructure
    const { firstname, lastname, age, address, email, mobile, gender, maritalstatus, specialization, experianceduration, previousehospitals, awards, workingdays, file_path } = req.body;

    const updateDoctor = {
        firstname,
        lastname,
        age,
        address,
        email,
        mobile,
        gender,
        maritalstatus,
        specialization,
        experianceduration,
        previousehospitals,
        awards,
        workingdays,
        file_path
    }

    const update = await Doctor.findByIdAndUpdate(userId, updateDoctor)
        .then(() => {
            res.status(200).send({ status: "User updated" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        })

})

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Doctor.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "User deleted" });
        }).catch((error) => {
            console.log(error.message);
            res.status(500).send({ status: "Error with deleting user", error: err.message });
        })
})

//fetch data from only one user

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Doctor.findById(userId).then((Doctor) => {

        res.json(Doctor);

        //res.status(200).send({status: "user fetched", doctor})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    })
})

router.route("/readDoctor").get(function (req, res) {

    Doctor.find().then((Doctor) => {

        res.json(Doctor);

    }).catch(function (err) {

        console.log(err);

    })
})

module.exports = router; 