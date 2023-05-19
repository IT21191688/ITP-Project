const router = require("express").Router();
const multer = require("multer");
let Medicine = require("../models/medicine");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Prescriptions');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage })



//---Add---

router.route("/add").post(upload.single("file_path"), (req, res) => {


    const mName = req.body.mName;
    const uPrice = req.body.uPrice;
    const qty = req.body.qty;

    console.log(mName)

    const newMedicine = new Medicine({

        mName,
        uPrice,
        qty


    })

    newMedicine.save().then(() => {
        res.json("Data Added")
    }).catch((err) => {
        console.log(err);
    })

})

//----Get---

router.route("/").get((req, res) => {

    Medicine.find().then((medicines) => {
        res.json(medicines)
    }).catch((err) => {
        console.log(err)
    })
})

//----Edit----

router.route("/update/:id").put(async (req, res) => {

    let userId = req.params.id;
    const { mName, uPrice, qty } = req.body;

    const updateMedicine = {

        mName,
        uPrice,
        qty
    }

    const update = await Medicine.findByIdAndUpdate(userId, updateMedicine).then(() => {
        res.status(200).send({ status: "User updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    })
})

router.route("/getNewMedicine/:id").get(async function (req, res) {
    let userId = req.params.id;

    const user = await Medicine.findById(userId).then(function (newMedicine) {
        res.json(newMedicine);
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({ status: "Error with get user", error: err.message });
    });
})


//----delete---

router.route("/delete/:id").delete(async (req, res) => {
    let uID = req.params.id;

    await Medicine.findByIdAndDelete(uID).then(() => {
        res.status(200).send({ status: "User Deleted" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete user", error: err.message });
    })
})

module.exports = router;