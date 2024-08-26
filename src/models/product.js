const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    upc: {type: String, required: true, unique: true},
    brandName: {type: String, required: true},
    zoneID: {type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true},
    price: { type: Number, required: true},
})

module.exports = mongoose.model('Product', productSchema);