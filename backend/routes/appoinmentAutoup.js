const cron = require('node-cron');
const express = require('express');
const Doctor = require('../models/Doctor');
let Appoinment = require("../models/appoinment");
const router = express.Router();

cron.schedule('0 21 * * *', function () {
    console.log("Status Updated");
    updateStatus();
});

const updateStatus = async function (res) {

    const today = new Date();

    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const d = today.getDate();

    let md;
    let dd;

    if (m < 10) {
        md = "0" + m;
    } else {
        md = m
    }

    if (d < 10) {
        dd = "0" + d;
    } else {
        dd = d
    }

    const modifiedDate = y + "-" + md + "-" + dd + "T00:00:00.000Z"

    const appointments = await Appoinment.find();
    const doctors = await Doctor.find();

    for (const doc of doctors) {

        for (const app of appointments) {

            if (app.doctor_name === doc.firstname + " " + doc.lastname) {

                const AY = app.date.getFullYear();
                const AM = app.date.getMonth() + 1;
                const AD = app.date.getDate();

                let AMD, ADD;

                if (AM < 10) {
                    AMD = "0" + AM;
                } else {
                    AMD = AM
                }
                if (d < 10) {
                    ADD = "0" + AD;
                } else {
                    ADD = AD
                }

                const modifiedAppDate = AY + "-" + AMD + "-" + ADD + "T00:00:00.000Z";

                if (modifiedAppDate === modifiedDate) {

                    if (app.status === "pending") {

                        let userId = app.id;


                        status = "unsuccess"

                        const updateAppointment = {
                            status
                        }

                        const updatedAppointment = await Appoinment.findByIdAndUpdate(userId, updateAppointment, { new: true });

                        if (updatedAppointment) {
                            //if updated Appoinment status
                        } else {
                            //console.log("Appointment not found with ID: ", userId);
                        }
                    }
                }
            }
        }
    }

    return "Update complete";
}

module.exports = router;
