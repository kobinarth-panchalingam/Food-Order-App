const mongoose = require('mongoose');

const productGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    userIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
}, {
    collection: 'ProductGroup',
    timestamps: true
});

module.exports = mongoose.model('ProductGroup', productGroupSchema);
