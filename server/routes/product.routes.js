const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    deleteProduct
} = require('../controllers/product.controller');

router.get('/', getProducts);
router.post('/', createProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;
