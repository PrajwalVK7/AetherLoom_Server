const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    thumbnail: {
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    gst:{
        type:String,
        require:true
    },
    images:{
        type:[String],
        

    }
})

const products = mongoose.model("products",productSchema);
module.exports = products