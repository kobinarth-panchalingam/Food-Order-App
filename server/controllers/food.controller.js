const Food = require("../models/food.model");

// Controller to create a new food item
const createFood = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const food = new Food({ name, description, price });
    const savedFood = await food.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get all food items
const getFoodItems = async (req, res) => {
  try {
    const foodItems = await Food.find().sort({ price: "asc" });
    res.json(foodItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createFood,
  getFoodItems,
};
