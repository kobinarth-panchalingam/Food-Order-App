const express = require('express');
const router = express.Router();
const {
    addUsageRecord,
    getUsageRecords
} = require('../controllers/usageRecord.controller');

router.get('/:groupId', getUsageRecords);
router.post('/:groupId', addUsageRecord);

module.exports = router;
