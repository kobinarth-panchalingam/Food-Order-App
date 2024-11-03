const express = require('express');
const router = express.Router();
const {
    createProductGroup,
    getProductGroups,
    addUsersToProductGroup,
    deleteProductGroup,
} = require('../controllers/productGroup.controller');

router.get('', getProductGroups);
router.post('/:groupId/users', addUsersToProductGroup);
router.post('/', createProductGroup);
router.delete('/:groupId', deleteProductGroup);

module.exports = router;
