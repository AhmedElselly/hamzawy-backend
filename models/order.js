const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    method: {
        type: Number,
    },
    cart: {
        products: Array
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);