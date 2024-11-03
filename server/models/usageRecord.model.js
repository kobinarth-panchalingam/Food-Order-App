const mongoose = require('mongoose');

const UsageRecordSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductGroup',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const UsageRecord = mongoose.model('UsageRecord', UsageRecordSchema);
module.exports = UsageRecord;
