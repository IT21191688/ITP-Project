const router = require("express").Router();
const patient = require("../models/patient");
const path = require("path");



router.route("/login").post((req, res) => {
    const { email, password } = req.body;

    if (email === "admin@gmail.com" && password === "admin") {
        res.status(200).json({
            user: {
                _id: "admin",
                name: "admin",
                email: "admin@gmail.com",
            },
            role: 'admin',
            message: "Login successfull"
        });
    } else {
        try {
            patient.find({ email: email }).then((patients) => {
                if (patients.length === 0) {
                    res.status(401).json({
                        message: "User not found"
                    });
                } else {
                    if (patients[0].password === password) {
                        res.status(200).json({
                            user: patients[0],
                            role: 'user',
                            message: "Login successfull"
                        });
                    } else {
                        res.status(401).json({
                            message: "Password incorrect"
                        });
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            res.status(401).json({
                message: "Email Password incorrect"
            });
        }


    }
})

module.exports = router; 