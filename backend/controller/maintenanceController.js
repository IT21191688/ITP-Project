const express = require('express')

const maintenanceController = express.Router()

const Model = require('../models/Maintenance')

//Post Method
maintenanceController.post('/maintenance', async (req, res) => {
    const reqBody = req.body
    const data = new Model({
        roomNo: reqBody.roomNo,
        date: reqBody.date,
        requestingOfficer: reqBody.requestingOfficer,
        reason: reqBody.reason,
        type: reqBody.type,
        requiredMaterials: reqBody.requiredMaterials,
        routineOrNot: reqBody.routineOrNot,
        estimatedCompletionTime: reqBody.estimatedCompletionTime,
        description: reqBody.description,
        maintenanceTechSignature: reqBody.maintenanceTechSignature,
        supervisorSignature: reqBody.supervisorSignature,
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
maintenanceController.get('/maintenance', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
maintenanceController.get('/maintenance/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
maintenanceController.put('/maintenance/:id', async (req, res) => {
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
maintenanceController.delete('/maintenance/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = maintenanceController
