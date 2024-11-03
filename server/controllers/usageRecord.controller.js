const UsageRecord = require('../models/usageRecord.model');
const ProductGroup = require('../models/productGroup.model');

const addUsageRecord = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { userIds } = req.body;

        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: 'userIds must be a non-empty array.' });
        }

        // Retrieve the ProductGroup to validate userIds
        const productGroup = await ProductGroup.findById(groupId);
        if (!productGroup) {
            return res.status(404).json({ message: 'Product group not found.' });
        }

        // Check if all userIds in the request are in productGroup.userIds
        const invalidUserIds = userIds.filter(userId => !productGroup.userIds.includes(userId));
        if (invalidUserIds.length > 0) {
            return res.status(400).json({
                message: 'Some userIds are not members of the product group.',
                invalidUserIds
            });
        }

        // Create an array to hold usage records
        const usageRecords = userIds.map(userId => new UsageRecord({ groupId, userId }));

        // Save all usage records
        const savedRecords = await UsageRecord.insertMany(usageRecords);

        res.status(201).json(savedRecords); // Return all saved records
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all usage records for a product group
const getUsageRecords = async (req, res) => {
    try {
        const usageRecords = await UsageRecord.find({ groupId: req.params.groupId });

        res.status(200).json(usageRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addUsageRecord,
    getUsageRecords
};
