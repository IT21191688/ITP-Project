const router = require("express").Router();
let Salary = require("../models/Salary");
const path = require("path");


router.route("/addsalary").post((req,res)=>{

    const name = req.body.name;

    const basicsalary = Number(req.body.basicsalary);
    
    const completedhours = Number(req.body.completedhours);

    const OTsalary = Number(req.body.OTsalary);
    


    const newSalary = new Salary({
        //auto generated ID
        name,
        basicsalary,
        completedhours,
        OTsalary,
        
    })

    newSalary.save().then(()=>{
        res.json("Doctor Salary Added")
    }).catch((err)=>{
   
        console.log(err);
    })


})

router.route("/salary").get((req,res)=>{

    Salary.find().then((salary)=>{
        res.json(salary)
    }).catch((err)=>{
        console.log(err)
    })


})

router.route("/updatesalary/:id").put(async(req,res)=>{

    let userId = req.params.id;

    //destructure
    const {name,basicsalary,completedhours,OTsalary} = req.body;

    const updateSalary = {
        name,
        basicsalary,
        completedhours,
        OTsalary,
        
    }

    const update = await Salary.findByIdAndUpdate(userId, updateSalary)
    .then(()=>{
    res.status(200).send({status: "User salary updated"})
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with updating salary", error:err.message});
    })

})

router.route("/deletesalary/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await Salary.findByIdAndDelete(userId)
    .then(() =>{
        res.status(200).send({status: "User deleted"});
    }).catch((error) => {
        console.log(error.message);
        res.status(500).send({status: "Error with deleting user", error: err.message});
    })
})

//fetch data from only one user

router.route("/getsalary/:id").get(async (req,res) =>{
    let userId = req.params.id;
    const user = await Salary.findById(userId).then((Salary) => {

        res.json(Salary);

        //res.status(200).send({status: "user fetched", doctor})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

module.exports = router; 