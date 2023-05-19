//create varables and import pacages
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cron = require('node-cron');

//import .env
require("dotenv").config();

//initialize port number
const PORT = process.env.PORT || 8050;

//use dependancies
app.use(cors());
//get json using bodyparser
app.use(bodyParser.json());

//connect mongo db options
const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB!!!')
})

const db = mongoose.connection;

//open connection
//normal funtion also can use
/*
db.once('open',()=>{

    console.log("Mongodb Connection Success");

})
*///




const appoinmentRouter = require("./routes/appoinments.js");
app.use("/appoinment", appoinmentRouter);

const sheduleEmail = require("./routes/sheduleemail.js");
app.use("/sheduleEmail", sheduleEmail);


const labAppoinmentRouter = require("./routes/labappoinments.js");
app.use("/Appoinment_slip", express.static("Appoinment_slip"));
app.use("/labappoinment", labAppoinmentRouter);

const doctorRouter = require("./routes/doctors.js");
app.use("/doctor", doctorRouter);
app.use("/images", express.static("images"));


const reportRouter = require("./routes/reports.js");
const bloodreportRouter = require("./routes/bloodreports.js");
const labitemsinventory = require("./routes/labitemsinventory");
app.use("/report", reportRouter);//load the reports file inside the route folder
app.use("/bloodreport", bloodreportRouter);
app.use("/labitemsinventory", labitemsinventory);


const roomBookRoutes = require("./controller/roomBookController")
const inventoryRoutes = require("./controller/inventoryController")
const maintenanceRoutes = require("./controller/maintenanceController")
app.use('/api', roomBookRoutes)
app.use('/api', inventoryRoutes)
app.use('/api', maintenanceRoutes)


const pharmacyRouter = require("./routes/pharmacies.js");
const updateTotal = require("./routes/updateTotals.js")
const Medicine = require("./routes/medicines.js");

app.use("/pha", pharmacyRouter);
app.use("/Prescriptions", express.static("Prescriptions"));
app.use("/upd", updateTotal);
app.use("/med", Medicine);

const patientRouter = require("./routes/patients.js");

app.use("/patient", patientRouter);  //load patient js
app.use("/ProfilePic", express.static("ProfilePic"));

const CustomerRouter = require("./routes/Customers.js");
app.use("/customer", CustomerRouter);

// const doctorRouter = require("./routes/doctors.js");
const salaryRouter = require("./routes/salary.js");

// app.use("/doctor", doctorRouter);//load doctors.js
app.use("/DoctorImage", express.static("DoctorImage"));
app.use("/salary", salaryRouter);//load salary.js

const sheduleUpdate = require("./routes/appoinmentAutoup.js");
app.use("/appinmentAutoup", sheduleUpdate);

const VideoConsultant = require("./routes/Consult.js");
app.use("/vconsult", VideoConsultant);

const paymentRoutes = require('./controller/paymentController')
const salaryRoutes = require('./controller/salaryController')
app.use('/api', paymentRoutes)
app.use('/api', salaryRoutes)

const loginRoutes = require('./routes/login.js')
app.use('/auth', loginRoutes)

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})

