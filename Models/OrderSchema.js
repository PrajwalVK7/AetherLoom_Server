const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true
    },
    items: [{
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            require: true
        },
        total: {
            type: String,
            require: true
        },
        itemCount: {
            type: Number,
            require: true
        }
    }],
    modeOfPayment: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    }
});

const orders = mongoose.model("orders", orderSchema);
module.exports = orders;
