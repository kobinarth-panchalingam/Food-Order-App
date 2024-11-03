const UsageRecord = require('../models/usageRecord.model');

// Record usage for a product group
exports.recordUsage = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        const newUsageRecord = new UsageRecord({ groupId, userId });
        await newUsageRecord.save();
        res.status(201).json(newUsageRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all usage records for a product group
exports.getUsageRecords = async (req, res) => {
    try {
        const usageRecords = await UsageRecord.find({ groupId: req.params.groupId })
            .populate('userId')
            .populate('groupId');
        res.status(200).json(usageRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
