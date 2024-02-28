
const carts = require('../Models/CartSchema')


exports.addToCart = async (req, res) => {
    console.log("cart");
    const userID = req.payload;
    const productID = req.params.productID;
    console.log(productID);
    const { count } = req.body;

    try {
        const isCart = await carts.findOne({ product: productID, userID: userID });

        if (isCart) {
            isCart.count += count;
            await isCart.save();
            res.status(200).json({ message: "Cart item updated", cartItem: isCart });
        } else {
            const newCartItem = new carts({
                product: productID,
                count: count,
                userID: userID
            });

            await newCartItem.save();
            res.status(200).json({ message: "Cart item created", cartItem: newCartItem });
        }
    } catch (err) {
        console.error("Error in addToCart:", err);
        res.status(401).json(err);
    }
};



exports.getAllFromCart = async (req, res) => {
    console.log('Getting all products from user cart....');
    const userID = req.payload;
    console.log(userID)
    try {
        const allProductsInCart = await carts.find({ userID: userID }).populate('product');
        console.log('Products in Cart:', allProductsInCart);
        if (allProductsInCart.length > 0) {
            res.status(200).json(allProductsInCart);
        } else {
            res.status(406).json("No products found in the cart");
        }
    } catch (err) {
        console.error("Error retrieving products from cart:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// delete from cart

exports.removeFromCart = async (req, res) => {
    const itemID = req.params.itemID
    console.log("delete", itemID)
    try {
        const removeItem = await carts.findByIdAndDelete({ _id: itemID })

        console.log(removeItem)
        res.status(200).json("Sucessfully removed from cart")
    }
    catch (err) {
        res.status(401).json(err)
    }
}

// update cart


exports.editCart = async (req, res) => {
    const itemID = req.params.itemID;
    const { count } = req.body;
    console.log('edit cart item:', req.params.itemID, count);
    try {
        const updatedItem = await carts.findOneAndUpdate(
            { _id: itemID },
            { $set: { count: count } },
            { new: true }
        );
        
        if (updatedItem) {
            res.status(200).json("Category Updated Successfully");
        } else {
            res.status(406).json("Not Found");
        }
        
    }
    catch (err) {
        res.status(401).json(err)
    }
}