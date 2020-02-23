const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const cartController = require('../controllers/cart');
const isAuth = require('../middleware/is-auth');

//GET /cart
router.get('/', isAuth, cartController.getUserCart);
router.post('/', isAuth, cartController.addItemToCart);
router.delete('/:productId', isAuth, cartController.removeCartItem);
router.patch('/', isAuth, cartController.updateCartItemQty);

module.exports = router;