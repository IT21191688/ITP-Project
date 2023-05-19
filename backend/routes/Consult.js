const router = require("express").Router();
let VideoCon = require("../models/VideoCon");
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'medixoehealth',
        pass: 'boupdtqanzqxslcg'
    },
    tls: {
        rejectUnauthorized: false
    }
});

router.route("/vidappointment").post((req,res)=>{

    const name =req.body.name;
    const phone =Number(req.body.phone);
    const specialist =req.body.specialist;
    const mail =req.body.mail;
    const date =req.body.date;
    

    const newCustomer = new VideoCon({
        name,
        phone,
        specialist,
        mail,
        date,
        
    })
    const mailOptions = {
        from: 'medixoehealth@gmail.com',
        to: mail,
        subject: 'Registration Success',
        text: `Dear ${name}, \n\n You have registered to Medixo E-Health system successfully!!`
    };

    newCustomer.save().then(()=>{
        res.json("Customer Added")
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log("email sent : " + info.response)
            }
        })
    }).catch((err)=>{
        console.log(err);
    })
    
})

router.route("/").get((req,res)=>{

    VideoCon.find().then((Consult)=>{
    res.json(Consult)
}).catch((err)=>{
    console.log(err);
})
})

router.route("/update/:id").put(async(req, res)=>{
    let userId =req.params.id;
    const {name,phone,specialist,mail,date}= req.body;

    const updateCustomer ={
        name,
        phone,
        specialist,
        mail,
        date
    }

    const update=await VideoCon.findByIdAndUpdate(userId, updateCustomer)
    .then(()=>{
    res.status(200).send({status:"User update"})
}).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"error with updating date"});
})
})

router.route("/delete/:id").delete(async(req, res)=>{
    let userId =req.params.id;

    await VideoCon.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"error with delete user",error:err.message});
    })
 })

 router.route("/get/:id").get(async(req, res)=>{
    let userId =req.params.id;
    const user=await VideoCon.findById(userId)
    .then((user)=>{
        res.status(200).json(user)
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"error with get user",error:err.message});
    })
 })


module.exports = router;
