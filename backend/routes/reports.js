const router = require("express").Router();
let Report = require("../models/Report");//import Report.js file insaide models folder


const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
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

let upload = multer({ storage, fileFilter })

//data inserting
router.route("/add").post(upload.single("filepath"), (req, res) => {

    const ID = req.body.ID;//frontend requested data assign these const variables
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const doctor = req.body.doctor;
    const sampleType = req.body.sampleType;
    const processedDate = req.body.processedDate;
    const TechnologistName = req.body.TechnologistName;
    const filepath = req.file.filename;
    const status = "noted";



    const newReport = new Report({//create object using Report model

        ID,
        name,
        age,
        gender,
        doctor,
        sampleType,
        processedDate,
        TechnologistName,
        filepath,
        status
    })

    console.log(req.file)
    //newStudent object eken save call karala model eka haraha Student js eken mongo db ekata document ekak widihata newStudent yanwa 
    newReport.save().then(() => {
        res.json("Data successfully Added")//sent  response in jsone format and show msg in front end
    }).catch((err) => {
        console.log(err);
    })

})




//data reading
http://localhost:8050/report 
router.route("/").get((req, res) => {
    Report.find().then((reports) => {//get details in database through Report model
        res.json(reports)
    }).catch((err) => {
        console.log(err);
    })
})


//data updating
http://localhost:8050/report/update/5fsad 
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { ID, name, age, gender, doctor, sampleType, processedDate, TechnologistName, filepath, status } = req.body;//take updated data of body(frontend) and assign body data to thses const variables

    const updateReport = {
        ID,
        name,
        age,
        gender,
        doctor,
        sampleType,
        processedDate,
        TechnologistName,
        filepath,
        status
    }

    const update = await Report.findByIdAndUpdate(userId, updateReport).then(() => {

        res.status(200).send({ status: "User updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data" })
    })

})


//deleting data

http://localhost:8050/report/delete/5fsad 
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await Report.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "User deleted" });

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete user", error: err.message })
    })

})

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const user = await Report.findById(userId).then((Report) => {
        res.json(Report)
        //res.status(200).send({status: "User fetched", student});

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message })
    })
})

router.route("/get/:ID").get(async (req, res) => {
    let ID = req.params.ID;

    const user = await Report.findById(ID).then((Report) => {
        alert('Data fetched')
        res.json(Report)
        //res.status(200).send({status: "User fetched", student});

    }).catch((err) => {
        alert(err.message);
        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message })
    })
})



module.exports = router;