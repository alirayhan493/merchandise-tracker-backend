const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    zoneID: {type: Number, required: true, unique: true},
    departmentID: {type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true},
    zoneName: {type: String, required: true},
});

module.exports = mongoose.model('Zone', zoneSchema);