const express = require('express');
const router = express.Router();
const {
    recordUsage,
    getUsageRecords
} = require('../controllers/usageRecord.controller');

// Usage Record routes
router.post('/', recordUsage);
router.get('/:groupId', getUsageRecords);

module.exports = router;
