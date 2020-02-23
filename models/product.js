const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    reviewsCount: {
        type: Number,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    information: {
        type: String,
        required: true
    }
});

productSchema.set('toObject', { virtuals: true })
productSchema.set('toJSON', { virtuals: true })

productSchema.virtual('id').get(function () {
    return this._id;
});

module.exports = mongoose.model('Product', productSchema);