const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        title:{
            type:String,
            require:true
        },
        thumbnail:{
            type:String
        }
    }
)

const categories = mongoose.model("categories",categorySchema);
module.exports = categories;