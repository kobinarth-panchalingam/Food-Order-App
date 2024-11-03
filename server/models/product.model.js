const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductGroup',
    },
    buyers: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            amountSpent: {
                type: Number,
                required: true
            }
        }
    ],
    purchaseTimestamp: {
        type: Date,
        default: Date.now
    },
    totalCost: {
        type: Number,
        required: true
    }
}, {
    collection: 'Product',
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
