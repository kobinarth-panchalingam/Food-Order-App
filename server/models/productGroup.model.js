const mongoose = require('mongoose');

const productGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
}, {
    collection: 'ProductGroup',
    timestamps: true
});

productGroupSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'groupId'
});

productGroupSchema.set('toJSON', { virtuals: true });
productGroupSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('ProductGroup', productGroupSchema);
