const router = require("express").Router();
const patient = require("../models/patient");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'medixoehealth',
        pass: 'boupdtqanzqxslcg'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './ProfilePic');
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
};

let upload = multer({ storage: storage })

router.route("/add").post(upload.single("file_path"), (req, res) => {
    const name = req.body.name;
    const nic = req.body.nic;
    const address = req.body.address;
    const birthdate = req.body.birthdate;
    const gender = req.body.gender;
    const phone = Number(req.body.phone);
    const email = req.body.email;
    const blood = req.body.blood;
    const height = Number(req.body.height);
    const weight = Number(req.body.weight);
    const surgery = req.body.surgery;
    const allergy = req.body.allergy;
    let profilePic = req.file.filename;
    const password = req.body.password;

    if (req.file) {
        image = req.file.filename;
    }

    const newPatient = new patient({
        name,
        nic,
        address,
        birthdate,
        gender,
        phone,
        email,
        blood,
        height,
        weight,
        surgery,
        allergy,
        profilePic,
        password
    });

    const mailOptions = {
        from: 'medixoehealth@gmail.com',
        to: email,
        subject: 'Registration Success',
        text: `Dear ${name}, \n\n You have registered to Medixo E-Health system successfully!!`
    };

    newPatient
        .save()
        .then(() => {
            res.json("Patient added successfully!");

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    console.log("email sent : " + info.response)
                }
            })

        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/").get((req, res) => {              //display all patients
    patient.find().then((patients) => {
        res.json(patients)
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/update/:id").put(async (req, res) => {     //update selected patients
    let userId = req.params.id;
    const { name, nic, address, birthdate, gender, phone, email, blood, height, weight, surgery, allergy } = req.body;  //d structure

    const updatePatient = {
        name,
        nic,
        address,
        birthdate,
        gender,
        phone,
        email,
        blood,
        height,
        weight,
        surgery,
        allergy
    }

    const update = await patient.findByIdAndUpdate(userId, updatePatient).then(() => {
        res.status(200).send({ status: "Patient details updated successfully!" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data!!", error: err.message });
    })
})

router.route("/delete/:id").delete(async (req, res) => {     //delete selected patients
    let userId = req.params.id;

    await patient.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "Patient deleted successfully!" })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting patient!!", error: err.message });
    })
})

router.route("/get/:id").get(async (req, res) => {     //fetch only selected patient
    let userId = req.params.id;

    const user = await patient.findById(userId).then((patient) => {
        res.json(patient);
        //res.status(200).send({status: "Patient fetched successfully!", patient})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching patient!!", error: err.message });
    })
})



module.exports = router; 