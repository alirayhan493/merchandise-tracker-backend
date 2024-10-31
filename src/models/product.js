const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    upc: {type: String, required: true, unique: true},
    brandName: {type: String, required: true},
    zoneID: {type: Number, ref: 'Zone', required: true},
    price: { type: Number, required: true},
    imageUrl: {type: String, required: true},
    dataAdded: {type: Date, default: Date.now},

})

module.exports = mongoose.model('Product', productSchema);