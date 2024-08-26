const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentID: {type: Number, required: true, unique: true},
    departmentName: {type: String, required: true},
});

module.exports = mongoose.model('Department', departmentSchema);