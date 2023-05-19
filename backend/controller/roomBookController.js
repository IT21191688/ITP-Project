const express = require('express')

const roomBookController = express.Router()

const Model = require('../models/RoomBook')

//Post Method
roomBookController.post('/roomBook', async (req, res) => {
    const reqBody = req.body
    const data = new Model({
        regNo: reqBody.regNo,
        name: reqBody.name,
        roomNo: reqBody.roomNo,
        age: reqBody.age,
        gender: reqBody.gender,
        contactNo: reqBody.contactNo,
        email: reqBody.email,
        doctorName: reqBody.doctorName,
        admitType: reqBody.admitType,
        feature: reqBody.feature,
        class: reqBody.class,
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
roomBookController.get('/roomBook', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
roomBookController.get('/roomBook/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
roomBookController.put('/roomBook/:id', async (req, res) => {
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
roomBookController.delete('/roomBook/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = roomBookController
