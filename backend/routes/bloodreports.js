const router = require("express").Router();
let BloodReport = require("../models/BloodReport");



//data inserting
router.route("/addBlood").post((req, res) => {

    const ID = req.body.ID;
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const doctor = req.body.doctor;
    const sampleType = req.body.sampleType;
    const processedDate = req.body.processedDate;
    const TechnologistName = req.body.TechnologistName;
    const WBC = Number(req.body.WBC);
    const NEUT = Number(req.body.NEUT);
    const LYMPH = Number(req.body.LYMPH);
    const MONO = Number(req.body.MONO);
    const EO = Number(req.body.EO);
    const BASO = Number(req.body.BASO);
    const RBC = Number(req.body.RBC);
    const HGB = Number(req.body.HGB);
    const HCT = Number(req.body.HCT);
    const MCV = Number(req.body.MCV);
    const status = "noted";

    const newBloodReport = new BloodReport({
        ID,
        name,
        age,
        gender,
        doctor,
        sampleType,
        processedDate,
        TechnologistName,
        WBC,
        NEUT,
        LYMPH,
        MONO,
        EO,
        BASO,
        RBC,
        HGB,
        HCT,
        MCV,
        status
    })

    console.log(req.file)
    //newStudent object eken save call karala model eka haraha Student js eken mongo db ekata document ekak widihata newStudent yanwa 
    newBloodReport.save().then(() => {
        res.json("Data successfully Added")//show msg in front end
    }).catch((err) => {
        console.log(err);
    })

})




//data reading
http://localhost:8050/blood 
router.route("/blood").get((req, res) => {
    BloodReport.find().then((bloodreports) => {
        res.json(bloodreports)
    }).catch((err) => {
        console.log(err);
    })
})


//data updating
http://localhost:8050/bloodreport/update/5fsad 
router.route("/updateBlood/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { ID, name, age, gender, doctor, sampleType, processedDate, TechnologistName, WBC, NEUT, LYMPH, MONO, EO, BASO, RBC, HGB, HCT, MCV, status } = req.body;

    const updateBloodReport = {
        ID,
        name,
        age,
        gender,
        doctor,
        sampleType,
        processedDate,
        TechnologistName,
        WBC,
        NEUT,
        LYMPH,
        MONO,
        EO,
        BASO,
        RBC,
        HGB,
        HCT,
        MCV,
        status
    }

    const update = await BloodReport.findByIdAndUpdate(userId, updateBloodReport).then(() => {

        res.status(200).send({ status: "User updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data" })
    })

})


//deleting data

http://localhost:8050/bloodreport/delete/5fsad 
router.route("/deleteBlood/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await BloodReport.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "User deleted" });

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete user", error: err.message })
    })
})

router.route("/getBlood/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await BloodReport.findById(userId).then((BloodReport) => {
        res.json(BloodReport)
        //res.status(200).send({status: "User fetched", student});

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message })
    })
})



module.exports = router;