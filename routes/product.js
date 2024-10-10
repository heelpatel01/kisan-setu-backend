const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts } = require('../controllers/productController.js');

// @route POST /products
router.post('/', addProduct);

// @route GET /products
router.get('/', getAllProducts);

module.exports = router;
