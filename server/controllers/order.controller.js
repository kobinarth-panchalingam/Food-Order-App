const Order = require("../models/order.model");

// Controller to create a new order
const createOrder = async (req, res) => {
  try {
    const { user, food, quantity } = req.body;
    const order = new Order({ user, food, quantity });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
