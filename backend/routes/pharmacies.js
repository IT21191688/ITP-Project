const router = require("express").Router();
let Pharmacy = require("../models/pharmacy");


const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Prescriptions');
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




//---Add---

router.route("/add").post(upload.single("file_path"), (req, res) => {


    const orderID = "DefaultOrder";
    const title = req.body.title;
    const name = req.body.name
    const age = Number(req.body.age);
    const email = req.body.email;
    const telephone = req.body.telephone;
    const town = req.body.town;
    const address = req.body.address;
    const prescription = req.file.filename;
    const status = "Pending";

    const newPharmacy = new Pharmacy({

        orderID,
        title,
        name,
        age,
        email,
        telephone,
        town,
        address,
        prescription,
        status

    })

    newPharmacy.save().then(() => {
        res.json("Data Added")
    }).catch((err) => {
        console.log(err);
    })

})

//---Get----

router.route("/").get((req, res) => {

    Pharmacy.find().then((pharmacys) => {
        res.json(pharmacys)
    }).catch((err) => {
        console.log(err)
    })
})

//---Edit---

router.route("/update/:id").put(async (req, res) => {

    let uID = req.params.id;
    const { orderID, title, name, age, email, telephone, town, address, prescription, status } = req.body;

    const updatePharmacy = {
        orderID,
        title,
        name,
        age,
        email,
        telephone,
        town,
        address,
        prescription,
        status
    }

    const update = await Pharmacy.findByIdAndUpdate(uID, updatePharmacy).then(() => {
        res.status(200).send({ status: "User updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    })
})


router.route("/getonePharmacy/:id").get(async function (req, res) {
    let userId = req.params.id;

    const user = await Pharmacy.findById(userId).then(function (Pharmacy) {
        res.json(Pharmacy);
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({ status: "Error with get user", error: err.message });
    });
})

//---delete---

router.route("/delete/:id").delete(async (req, res) => {
    let uID = req.params.id;

    await Pharmacy.findByIdAndDelete(uID).then(() => {
        res.status(200).send({ status: "User Deleted" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete user", error: err.message });
    })
})

module.exports = router;