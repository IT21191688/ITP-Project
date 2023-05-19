const express = require('express')

const paymentController = express.Router()

const Model = require('../models/Payment')

//Post Method
paymentController.post('/payment', async (req, res) => {
    const reqBody = req.body
    const data = new Model({
        dateTime: reqBody.dateTime,
        amount: reqBody.amount,
        purpose: reqBody.purpose,
        paidVia: reqBody.paidVia,
        payersName: reqBody.payersName,
        nicOrPassport: reqBody.nicOrPassport,
        contactNo: reqBody.contactNo,
        email: reqBody.email,
        address: reqBody.address,
        verified: reqBody.verified
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
paymentController.get('/payment', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
paymentController.get('/payment/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
paymentController.put('/payment/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
paymentController.delete('/payment/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = paymentController