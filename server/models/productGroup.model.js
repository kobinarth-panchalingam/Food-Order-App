const productGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('ProductGroup', productGroupSchema);
