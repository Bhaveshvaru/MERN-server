const express = require('express');
const router = express.Router();

const { } = require('../controllers/cart');
const { requireSignin, userMiddleware } = require('../common-middleware');

router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart);
//router.get('/category/getCategory', getCategories);
module.exports = router;
