const router = require("express").Router();
let LabItemsInventory = require("../models/LabItemsInventory");



//data inserting
router.route("/addItem").post((req, res) => {

    const itemID = req.body.itemID;
    const itemname = req.body.itemname;
    const expiryDate = req.body.expiryDate;
    const quantity = req.body.quantity;
    const labManager = req.body.labManager;
    const noOfitem = Number(req.body.noOfitem);


    const newLabItemsInventory = new LabItemsInventory({
        itemID,
        itemname,
        expiryDate,
        quantity,
        labManager,
        noOfitem
    })

    console.log(req.file)
    //newStudent object eken save call karala model eka haraha Student js eken mongo db ekata document ekak widihata newStudent yanwa 
    newLabItemsInventory.save().then(() => {
        res.json("Data successfully Added")//show msg in front end
    }).catch((err) => {
        console.log(err);
    })

})




//data reading
http://localhost:8050/labitemsinventory/item 
router.route("/item").get((req, res) => {
    LabItemsInventory.find().then((labitemsinventory) => {
        res.json(labitemsinventory)
    }).catch((err) => {
        console.log(err);
    })
})


//data updating
//data updating
http://localhost:8050/report/update/5fsad 
router.route("/updateItem/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { itemID, itemname, expiryDate, quantity, labManager, noOfitem } = req.body;

    const UpdateItem = {
        itemID,
        itemname,
        expiryDate,
        quantity,
        labManager,
        noOfitem
    }

    const update = await LabItemsInventory.findByIdAndUpdate(userId, UpdateItem).then(() => {

        res.status(200).send({ status: "User updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data" })
    })

})


//deleting data

http://localhost:8050/labitemsinventory/deleteItem/5fsad 
router.route("/deleteItem/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await LabItemsInventory.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "User deleted" });

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete user", error: err.message })
    })
})

router.route("/getItem/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await LabItemsInventory.findById(userId).then((LabItemsInventory) => {
        res.json(LabItemsInventory)
        //res.status(200).send({status: "User fetched", student});

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message })
    })
})



module.exports = router;