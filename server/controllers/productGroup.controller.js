const ProductGroup = require('../models/productGroup.model');

// Create a new product group
const createProductGroup = async (req, res) => {
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
const addUsersToProductGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { userIds } = req.body;

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
const getProductGroups = async (req, res) => {
    try {
        const productGroups = await ProductGroup.find()
            .populate('products')

        res.status(200).json(productGroups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product group
const deleteProductGroup = async (req, res) => {
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

module.exports = {
    createProductGroup,
    addUsersToProductGroup,
    getProductGroups,
    deleteProductGroup
};  