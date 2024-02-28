const wishlists = require('../Models/wishlistSchema');


exports.addToWishlist = async (req, res) => {
    // console.log("Inside add to wishlist")
    const userID = req.payload;
    const productID = req.params.productID;
    // console.log(userID,productID)
    try {
        const existingItem = await wishlists.findOne({ userID: userID, product: productID })
        console.log(existingItem)
        if (existingItem) {
            res.status(406).json("Product already exists in wishlist")
        }
        else {
            const newItem = new wishlists({
                userID: userID,
                product: productID
            })
            await newItem.save();
            res.status(200).json("Item is added to wishlist")
        }
    }
    catch (err) {
        console.log(err)
        res.status(401).json(err)
    }
}

exports.getAllFromWishlist = async (req, res) => {
    const userID = req.payload;
    try {
        const wishlistItems = await wishlists.find({ userID: userID }).populate('product');
        if (wishlistItems) {
            res.status(200).json(wishlistItems)
        }
        else {
            res.status(406).json("No products in wishlist")
        }
    }
    catch (err) {
        console.log(err)
        res.status(200).json(err)
    }
}

exports.removeFromWishlist = async (req, res) => {
    const userID = req.payload;
    const itemID = req.params.itemID;
    try {
        const deleteProduct = await wishlists.findOneAndDelete({ userID })
        if(deleteProduct){
            res.status(200).json("Product was removed")
        }
        else{
            res.status(406).json("Request Failed , product Not found")
        }
    }
    catch (err) {
        console.log(err)
        res.status(200).json(err)
    }
}