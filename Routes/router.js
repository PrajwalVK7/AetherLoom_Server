// router --- defining paths to resolve various reqs

// express
const userController = require('../Controllers/userController');
const categoryController = require('../Controllers/categoryController');
const productController = require('../Controllers/productController')
const adminController = require('../Controllers/adminController')
const orderController = require('../Controllers/orderController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfigure = require('../Middlewares/multerMiddleware')
const express = require('express');

// obj for the cls Router in express
const router = new express.Router();


// paths for resolving request

// user register
router.post('/user/register',userController.register)

// user login
router.post('/user/login',userController.login)


/////   admin
router.post('/admin/login',adminController.adminLogin);

// get all user details
router.get('/user/getallusers',userController.getAllUsers)

// uploading categories
router.post('/categories',jwtMiddleware,multerConfigure.single('thumbnail'),categoryController.addCategory)

//getAll Categories (admin)
router.get('/categories',jwtMiddleware,categoryController.getAllCategories)

//getAll Categories (admin)
router.get('/categories/list',categoryController.getAllCategories)

// add products
router.post('/products',multerConfigure.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 4}]), productController.addProduct);

//getAll Products (admin)
router.get('/products',jwtMiddleware,productController.getAllProducts)

//getAll Products (user)
router.get('/products/list',productController.getAllProducts)

// get recent products (user)
router.get('/products/list/recent',productController.getRecentProducts)

// delete prduct by id
router.delete('/products/delete/:_id',productController.deleteProductById)

// delete category by id
router.delete('/categories/delete/:_id',jwtMiddleware,categoryController.deleteCategoryById);

// get products by category(admin)
router.get('/products/category/:category',jwtMiddleware,productController.getAllProductsByCategory)

// get products by category(admin)
router.get('/products/category/user/:category',productController.getAllProductsByCategory)

// get product by id (admin)
router.get('/products/:_id',jwtMiddleware,productController.getProductById)

// get product by id (user)
router.get('/products/user/:_id',productController.getProductById)

// order product

router.post('/product/order/true',jwtMiddleware,orderController.orderProduct)

// export router
module.exports = router;