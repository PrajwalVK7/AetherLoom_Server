const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        require:true
    },
    count: {
        type: Number,
        default: 1,
        require:true

    }
})

const cart = mongoose.model("cart", cartSchema);
module.exports = cart