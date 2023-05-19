const cron = require('node-cron');
const express = require('express');
//const sendEmails = require('./sendEmails');
const nodemailer = require('nodemailer');
const Doctor = require('../models/Doctor');
let Appoinment = require("../models/appoinment");
const router = express.Router();
const Chart = require('chart.js/auto');
const pdfMake = require('pdfmake');
const GoogleChartsNode = require('google-charts-node');
const { createCanvas } = require('canvas');

//const PDFDocument = require('pdfkit');
const PDFDocument = require("pdfkit-table");
const fs = require('fs');


cron.schedule('0 0 * * *', function () {
    console.log("report send");
    sheduledEmail();
});


//Create a transporter object
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'medixoehealth',
        pass: 'boupdtqanzqxslcg'
    }
});

const sheduledEmail = async function () {

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

    const appoinments = await Appoinment.find();
    const doctors = await Doctor.find();

    for (const doc of doctors) {

        var docName = doc.firstname + " " + doc.lastname;


        let success = 0;
        let unsuccess = 0;
        let pending = 0;
        let cancel = 0;

        for (const app of appoinments) {

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

                //console.log(modifiedAppDate + " " + modifiedDate)

                if (modifiedAppDate === modifiedDate) {

                    if (app.status === "success") {

                        success++;

                    }
                    else if (app.status === "unsuccess") {


                        unsuccess++;

                    }
                    else if (app.status === "pending") {

                        pending++;

                    }
                    else {
                        cancel++;
                    }

                }
            }

        }


        const canvas = createCanvas(400, 400);
        const ctx = canvas.getContext('2d');

        // Set up data
        const data = [success * 30, pending * 30, cancel * 30, unsuccess * 30];
        const colors = ['#FF6384', '#36A2EB', '#e6ed0e', '#0d31d1'];
        const labels = ['Success', 'Pending', 'Cancel', 'Unsuccess'];

        // Set up chart dimensions and styling
        const barWidth = canvas.width / data.length * 0.8;
        const barSpacing = canvas.width / data.length * 0.2;
        const maxBarHeight = canvas.height * 0.8;
        ctx.font = '12px Arial';

        // Draw bars
        for (let i = 0; i < data.length; i++) {
            const barHeight = data[i] / 100 * maxBarHeight;
            const barX = i * (barWidth + barSpacing) + barSpacing / 2;
            const barY = canvas.height - barHeight;
            ctx.fillStyle = colors[i];
            ctx.fillRect(barX, barY, barWidth, barHeight);

            // Draw label
            const labelX = barX + barWidth / 2;
            const labelY = canvas.height - maxBarHeight - 10;
            ctx.fillStyle = 'black';
            ctx.fillText(labels[i], labelX, labelY);
        }

        // Save the chart as an image
        const fs = require('fs');
        const out = fs.createWriteStream(`Reports/${docName}.png`);
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        await sleep(8000)
        out.on('finish', () => console.log('The bar chart was saved!'));



        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
                //console.log("after 5 sec")
            });
        }



        const outPng = `Reports/${docName}.png`;


        // create a new PDF document

        const document = new PDFDocument();

        document.lineWidth(1);
        document.strokeColor('black');

        // Draw the border
        document.rect(72, 72, 468, 648).stroke();

        document.image(`images/medlogo.png`, {
            fit: [100, 100],  // set the width and height of the image
            align: 'left',    // align the image to the left
            valign: 'top'     // align the image to the top
        });

        document.fontSize(20).text("Medixo E-Health Pvt.(LTD)", { align: "center", color: "blue", valign: 'top' })

        document.fontSize(16).text(`Appointments for ${doc.doctor_name} on ${y + "-" + md + "-" + dd}`, { align: 'center' });
        document.moveDown();

        document.fontSize(15).text(`Today Appoinments`, { align: 'center' })
        document.moveDown();

        document.fontSize(13).text(`           Success ${success}     Pending: ${pending}     Cancel ${cancel}     Unsuccess:${unsuccess}`)

        document.image(outPng)

        document.fontSize(10).text(`This Is the system generated E-mail '${today}`, {
            align: 'center',
            valign: 'bottom',
            color: "black"
        })

        // construct the file name
        const fileName = `Reports/${docName}.pdf`;

        // save the PDF document to a file
        document.pipe(fs.createWriteStream(fileName));

        // end the PDF document
        document.end();



        const mailOptions = {
            from: 'medixoehealth@gmail.com',
            to: doc.email,
            subject: 'Appointment details',
            attachments: [
                {
                    filename: `${docName}.pdf`,
                    path: `Reports/${docName}.pdf`
                }
            ],

            text: `Dear Doctor ${docName},\n\nToday You had ${success + unsuccess + pending + cancel} appoinments.\n\n
            
             Success  : ${success}\n
             UnSuccess: ${unsuccess}\n
             Pending  : ${pending}\n
             Cancel   : ${cancel}\n

            
            You Have Earned ${success} * 2000 =${success * 2000} Today.

            Thank You.\n

            (this is a system generated email no reply neded ${today}).`


        };


        //send mail
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response + doc.doctor_name);

            }
        });

    }
}



module.exports = router;