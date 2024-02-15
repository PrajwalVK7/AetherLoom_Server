const categories = require('../Models/CategorySchema');
// add category
exports.addCategory = async (req, res) => {
    console.log("Inside categoryController: add category");
    const userId = req.payload;
    console.log(userId,"id")
    const thumbnail = req.file.filename;

    try {
        const { title } = req.body;
        const existingCategory = await categories.findOne({ title: title });

        if (existingCategory) {
            return res.status(406).json("Category already exists");
        }
        else {
            const newCategory = new categories({
                title: title,
                thumbnail: thumbnail
            });
            await newCategory.save();
            console.log(newCategory)
            return res.status(200).json("Success");
        }


    } catch (err) {
        return res.status(401).json(`Category insertion failed due to: ${err}`);
    }
};


// get category


exports.getAllCategories = async (req, res) => {
    // console.log("Inside get category")
    try {
        const allCategories = await categories.find();
        if (allCategories.length > 0) {
            res.status(200).json(allCategories);
        }
        else {
            res.status(401).json("No categories")
        }
    } catch (err) {
        console.error("Error getting all categories:", err);
        res.status(500).json("Internal Server Error");
    }
};



// delete

exports.deleteCategoryById = async (req, res) => {
    const _id = req.params._id;

    try {
        const deleteCategory =await categories.findByIdAndDelete(_id);
        if(deleteCategory){
            res.status(200).json("category Deleted Successfully")
        }
        else{
            res.status(406)
        }

    }
    catch (err) {
        res.status(401).json(`Request Failed Due To : ${err}`)
    }
}
