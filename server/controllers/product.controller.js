const Product = require('../models/product.model');

// Create a new product
const createProduct = async (req, res) => {
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
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
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

module.exports = {
    createProduct,
    getProducts,
    deleteProduct
};