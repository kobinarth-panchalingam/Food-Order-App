const Product = require('../models/product.model');
const ProductGroup = require('../models/productGroup.model');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, groupId, buyers, totalCost } = req.body;

        // Check if the total cost matches the sum of amounts spent by buyers
        const totalSpent = buyers.reduce((sum, buyer) => sum + buyer.amountSpent, 0);
        if (totalSpent !== totalCost) {
            return res.status(400).json({ message: "Total cost does not match the sum of amounts spent" });
        }

        const newProduct = new Product({ name, groupId, buyers, totalCost });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Create a new product group
exports.createProductGroup = async (req, res) => {
    try {
        const { name } = req.body;
        const newProductGroup = new ProductGroup({ name });
        await newProductGroup.save();
        res.status(201).json(newProductGroup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add users to a product group
exports.addUsersToProductGroup = async (req, res) => {
    try {
        const { groupId } = req.params; // Get the product group ID from the URL
        const { userIds } = req.body; // Get user IDs from the request body

        const updatedGroup = await ProductGroup.findByIdAndUpdate(
            groupId,
            { $addToSet: { userIds: { $each: userIds } } }, // Add unique user IDs
            { new: true }
        );

        if (!updatedGroup) {
            return res.status(404).json({ message: "Product group not found" });
        }

        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all product groups
exports.getProductGroups = async (req, res) => {
    try {
        const productGroups = await ProductGroup.find()
            .populate('products')
        res.status(200).json(productGroups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product group
exports.deleteProductGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const deletedProductGroup = await ProductGroup.findByIdAndDelete(groupId);
        if (!deletedProductGroup) {
            return res.status(404).json({ message: "Product group not found" });
        }
        res.status(200).json({ message: "Product group deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
