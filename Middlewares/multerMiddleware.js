const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log("Req body",req.body); // Check req.body for other form fields
    console.log(req.files); // Check req.files for the uploaded files

        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null, filename)
    }
})


const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg') {
           callback(null, true)

    }
    else {
        callback(null, false)
        return callback(new Error('Only png, jpg, jpeg files are allowed'))
    }
}

const multConfigure = multer({
    storage,
    fileFilter
})
module.exports = multConfigure;