const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    mobile: {
        type: String
    },
    pincode: {
        type: Number
    },
    street: {
        type: String
    },
    district: {
        type: String
    },
    state: {
        type: String
    },
    profile: {
        type: String
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }
    ],
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products'
            },
            count: { type: Number, default: 1 }
        }
    ]
});

const users = mongoose.model("users",userSchema);
module.exports = users