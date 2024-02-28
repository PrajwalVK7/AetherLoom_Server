const { response } = require('express');
const orders = require('../Models/OrderSchema')


exports.orderProduct = async (req, res) => {
    // console.log("Inside order")
    const userID = req.payload;
    // console.log(userId)
    try {
        const { productID, total, itemCount, modeOfPayment, address } = req.body
        const newOrder = new orders({
            userID: userID,
            productID: productID ? productID : `userID:${userID}`,
            total: total,
            itemCount: itemCount,
            modeOfPayment: modeOfPayment,
            address: address

        })
        await newOrder.save();
        console.log(newOrder)
        res.status(200).json(newOrder)
    }

    catch (err) {
        console.error("Error in orderProduct:", error);

        res.status(401).json("Request Failed due to", err)
    }
}

exports.getOrders = async (req, res) => {
    const userID = req.payload;
    try {
        const allOrders = await orders.find({ userID: userID }).populate('productID');
        res.status(200).json(allOrders);
    } catch (err) {
        console.error("Error in getOrders:", err);
        res.status(500).json("Request Failed due to an internal server error");
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