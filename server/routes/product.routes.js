const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    createProductGroup,
    getProductGroups,
    addUsersToProductGroup,
    deleteProductGroup,
    deleteProduct
} = require('../controllers/product.controller');

// Product routes
router.get('/', getProducts);
router.post('/', createProduct);
router.delete('/:productId', deleteProduct);

// Product Group routes
router.get('/groups', getProductGroups);
router.post('/groups/:groupId/users', addUsersToProductGroup);
router.post('/groups', createProductGroup);
router.delete('/groups/:groupId', deleteProductGroup);

module.exports = router;
