const router = require("express").Router();
const multer = require("multer");
let updateTot = require("../models/updateTotal");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Prescriptions');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload=multer({storage:storage})




//---Add---

router.route("/add").post(upload.single("file_path"), (req, res) => {

    const oderID = req.body.oderID;
    const totalFee = Number(req.body.totalFee);
    

    const newFee = new updateTot({

        oderID,
        totalFee

    })

    newFee.save().then(() => {
        res.json("Data Added")
    }).catch((err) => {
        console.log(err);
    })

})

//---Get---

router.route("/").get((req, res) => {

    updateTot.find().then((fee) => {
        res.json(fee)
    }).catch((err) => {
        console.log(err)
    })
})

//---Edit---

router.route("/update/:id").put(async (req, res) => {

    let oID = req.params.id;
    const { oderID, totalFee } = req.body;

    const updatePharmacy = {
        oderID,
        totalFee
    }

    const update = await updateTot.findByIdAndUpdate(oID, updateTotal).then(() => {
        res.status(200).send({ status: "User updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    })
})


//---delete---

router.route("/delete/:id").delete(async (req, res) => {
    let oID = req.params.id;

    await updateTot.findByIdAndDelete(oID).then(() => {
        res.status(200).send({ status: "User Deleted" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete user", error: err.message });
    })
})

module.exports = router;