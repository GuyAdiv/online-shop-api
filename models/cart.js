const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({ 
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
}, { _id : false });

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: [cartItemSchema]
});

module.exports = {
    Cart: mongoose.model('Cart', cartSchema),
    CartItem: mongoose.model('CartItem', cartItemSchema)
}
