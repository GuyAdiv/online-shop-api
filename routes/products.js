const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const productsController = require('../controllers/products');

//GET /products
router.get('/', productsController.getProducts);

//GET /products/:propertyId
router.get('/:productId', productsController.getProduct);

module.exports = router;