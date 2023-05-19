const express = require('express')

const cartItemController = express.Router()

const Model = require('../models/CartItem')

//Post Method
cartItemController.post('/cartItem', async (req, res) => {
    const reqBody = req.body
    const data = new Model({
        shippingNumber: reqBody.shippingNumber,
        itemCode: reqBody.itemCode,
        itemName: reqBody.itemName,
        itemQuantity: reqBody.itemQuantity,
        selectedQuantity: reqBody.selectedQuantity,
        itemPrice: reqBody.itemPrice,
        itemImage: reqBody.itemImage
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
cartItemController.get('/cartItem', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
cartItemController.get('/cartItem/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
cartItemController.put('/cartItem/:id', async (req, res) => {
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
cartItemController.delete('/cartItem/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = cartItemController
