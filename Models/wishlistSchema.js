const mongoose = require('mongoose');


const wishlistSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        require: true
    }
})

const wishlist = mongoose.model('wishlist',wishlistSchema);
module.exports = wishlist;