const
    router = require("express").Router();
let Customer = require("../models/Customer");

router.route("/add").post((req, res) => {

    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const mail = req.body.mail;
    const inquiry = req.body.inquiry;
    const message = req.body.message;

    const newCustomer = new Customer({
        name,
        age,
        gender,
        mail,
        inquiry,
        message
    })

    newCustomer.save().then(() => {
        res.json("Customer Added")
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/").get((req, res) => {

    Customer.find().then((Customers) => {
        res.json(Customers)
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/get/:id").get((req, res) => {
    let userId = req.params.id;
    Customer.findById(userId).then((Customers) => {
        res.json(Customers)
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name, age, gender, mail, inquiry, message } = req.body;

    const updateCustomer = {
        name,
        age,
        gender,
        mail,
        inquiry,
        message
    }

    const update = await Customer.findByIdAndUpdate(userId, updateCustomer)
        .then(() => {
            res.status(200).send({ status: "User update" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "error with updating date" });
        })
})

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Customer.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "User deleted" });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "error with delete user", error: err.message });
        })
})

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Customer.findById(userId)
        .then((user) => {
            res.status(200).json(user)
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "error with get user", error: err.message });
        })
})


module.exports = router;
