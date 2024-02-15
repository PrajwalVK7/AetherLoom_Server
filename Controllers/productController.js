const products = require('../Models/ProductSchema');

exports.addProduct = async (req, res) => {
    console.log("Inside product adding")
    console.log("requ body:", req.body);
    console.log("req files:", req.files);

    const thumbnail = req.files['thumbnail'][0].filename;
    const images = req.files['images'].map(file => file.filename);

    try {
        const { name, category,gst, description, price } = req.body;
        const existingProduct = await products.findOne({ name: name });
        if (existingProduct) {
            res.status(406).json("Product name already exists, Please Use unique name")
        }
        else {
            const newProduct = new products({
                name: name,
                category: category,
                thumbnail: thumbnail,
                description: description,
                images: images,
                price: price,
                gst:gst

            });
            await newProduct.save()
            res.status(200).json("Product added successfully")
        }

    }
    catch (err) {
        console.log(`product adding failed due to ${err}`)
        res.status(401).json(`Product adding Failed due to ${err}`)
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const searchKey = req.query.search;
        const query = {
            name:{
                $regex: searchKey, $options: 'i'
            }
        }

        const allProducts = await products.find(query);
        if (allProducts.length > 0) {
            res.status(200).json(allProducts)
        }
        else {
            res.status(406).json("No Products")
        }
    }
    catch (err) {
        res.status(401).json(`Product is not added , err : ${err}`)
    }
}

exports.getRecentProducts = async(req,res)=>{
    try{
        const product =await products.find().sort({"_id":-1}).limit(6)
        // console.log(product)
        if(product){
            res.status(200).json(product)
        }else{
            res.status(406).json("No Products")
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.getProductById = async(req,res)=>{
    const _id = req.params._id;
    console.log("Get pro",_id)
    try{
        const product = await products.findById(_id);
        if(product){
            res.status(200).json(product)
        }
        else{
            res.status(406).json("Request Failed")
        }

    }
    catch(err){
        res.status(401).json(`Request Failed due to ${err}`)
    }
}

exports.deleteProductById = async (req, res) => {
    const _id = req.params._id;
    try {
        const deleteProduct = await products.findByIdAndDelete(_id);
        if (deleteProduct) {
            res.status(200).json("Product Deleted Successfully");
        }
        else {
            res.status(406).json("Request Failed : Product Not Found")
        }
    }
    catch (err) {
        res.status(401).json("reqest Failed Due to ", err)
    }
}

exports.getAllProductsByCategory = async (req, res) => {
    console.log("Inside products by cate")
    const category = req.params.category;
    console.log("categ",category)
    try {
        const allProducts =await products.find({category:category})
        console.log(allProducts)
        if(allProducts){
            res.status(200).json(allProducts);
        }
        else{
            res.status(406).json(`No Products In ${category}`)
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.updateUserProfile = async(req,res)=>{
    
}