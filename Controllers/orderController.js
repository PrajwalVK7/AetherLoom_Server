const { response } = require('express');
const orders =  require('../Models/OrderSchema')


exports.orderProduct = async(req,res)=>{
    // console.log("Inside order")
    const userID = req.payload;
    // console.log(userId)
    try{
        const {productID,total,itemCount,modeOfPayment} = req.body
        const newOrder = new orders({
            userID:userID,
            productID:productID,
            total:total,
            itemCount:itemCount,
            modeOfPayment:modeOfPayment

        })
        await newOrder.save();
        res.status(200).json(newOrder)
    }

    catch(err){
        console.error("Error in orderProduct:", error);

        res.status(500).json("Request Failed due to",err)
    }
}