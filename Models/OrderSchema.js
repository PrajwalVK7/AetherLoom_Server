const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userID:{
        type:String,
        require:true
    },
    productID:{
        type:String,
        require:true
    },
    total:{
        type:String,
        require:true
    },
    itemCount:{
        type:Number,
        require:true
    }    ,
    modeOfPayment:{
        type:String,
        require:true
    }
})

const orders = mongoose.model("orders",orderSchema);
module.exports=orders;