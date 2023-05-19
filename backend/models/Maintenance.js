const mongoose = require('mongoose')

const MaintenanceSchema = new mongoose.Schema({
    roomNo: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    requestingOfficer: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    requiredMaterials: {
        type: String,
        required: true
    },
    routineOrNot: {
        type: String,
        required: true
    },
    estimatedCompletionTime: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    maintenanceTechSignature: {
        type: String,
        required: true
    },
    supervisorSignature: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("maintenance", MaintenanceSchema)