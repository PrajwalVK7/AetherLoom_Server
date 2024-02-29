const { response } = require('express');
const orders = require('../Models/OrderSchema')


exports.orderProduct = async (req, res) => {
    const userID = req.payload;
    try {

const { cart, productID, total, itemCount, modeOfPayment, address } = req.body;

console.log("cart:", cart);

const newOrder = new orders({
    userID: userID,
    items: cart ? cart.map(item => ({
        productID: item.productID, // Ensure that productID is present in each cart item
        total: item.total,
        itemCount: item.itemCount
    })) : [{
        productID: productID,
        total: total,
        itemCount: itemCount
    }],
    modeOfPayment: modeOfPayment,
    address: address
});

        await newOrder.save();
        console.log(newOrder);
        res.status(200).json(newOrder);
    } catch (err) {
        console.error("Error in orderProduct:", err);
        res.status(401).json(`Request Failed due to , ${err}`);
    }
}

exports.getOrders = async (req, res) => {
    const userID = req.payload;
    try {
        const allOrders = await orders.find({ userID: userID })
        .populate('items.productID')
    res.status(200).json(allOrders)
    console.log(allOrders)
    } catch (err) {
        console.error("Error in getOrders:", err);
        res.status(401).json("Request Failed due to an internal server error");
    }
}





exports.getAllOrdersFromDb = async (req, res) => {
    try {
        const allOrders = await orders.find();
        if(allOrders){
            res.status(200).json(allOrders)
        }
    }
    catch (err) {
        console.error("Error in getOrders:", err);
        res.status(500).json("Request Failed due to an internal server error");
    }
}