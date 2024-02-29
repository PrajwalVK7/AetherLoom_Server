// router --- defining paths to resolve various reqs

// express
const userController = require('../Controllers/userController');
const categoryController = require('../Controllers/categoryController');
const productController = require('../Controllers/productController')
const adminController = require('../Controllers/adminController')
const orderController = require('../Controllers/orderController')
const cartController = require('../Controllers/cartController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfigure = require('../Middlewares/multerMiddleware')
const wishlistController = require('../Controllers/wishlistController')
const express = require('express');

// obj for the cls Router in express
const router = new express.Router();


// paths for resolving request

// user register
router.post('/user/register',userController.register)

// user login
router.post('/user/login',userController.login)
//update userProfile
router.put('/user/profile/edit',jwtMiddleware,multerConfigure.single('profile'),userController.updateProfile)


/////   admin
router.post('/admin/login',adminController.adminLogin);

// get all user details
router.get('/user/getallusers',userController.getAllUsers)

// get user details
router.get('/user/profile',jwtMiddleware,userController.getUserData)

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
router.get('/products/featured',productController.getFeatured)
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
router.get('/orders',jwtMiddleware,orderController.getOrders)
//all
router.get('/orders/all',jwtMiddleware,orderController.getAllOrdersFromDb);


//UPDATE

// Update category

router.put('/categories/edit/:id',jwtMiddleware,multerConfigure.single('thumbnail'),categoryController.editCategory)

// update product

router.put('/products/edit/:id',jwtMiddleware,multerConfigure.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 4}]),productController.updateProduct)


// cart and wishlist

router.post('/user/add/cart/:productID',jwtMiddleware,cartController.addToCart)

//get carts
router.get('/user/cart/getAll', jwtMiddleware, cartController.getAllFromCart);
// delete from cart 
router.delete('/user/cart/remove/:itemID',jwtMiddleware,cartController.removeFromCart)
// edit cart
router.put('/cart/edit/:itemID',jwtMiddleware,cartController.editCart)

// delete all
router.delete('/cart/order=true',jwtMiddleware,cartController.deleteAll);

// wishlist 

router.post('/user/wishlist/add/:productID',jwtMiddleware,wishlistController.addToWishlist)
// get all from wishlist
router.get('/user/wishlist',jwtMiddleware,wishlistController.getAllFromWishlist);
// reomve
router.delete('/user/wishlist/remove/:itemID',jwtMiddleware,wishlistController.removeFromWishlist)
// export router
module.exports = router;