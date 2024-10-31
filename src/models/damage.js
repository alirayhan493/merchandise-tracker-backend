const mongoose = require('mongoose')

const damageSchema = new mongoose.Schema({
    upc: { type: String, required: true},
    dataAdded: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Damage', damageSchema);