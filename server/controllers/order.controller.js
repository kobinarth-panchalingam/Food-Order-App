const Order = require("../models/order.model");

// Controller to create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, foodId, quantity } = req.body;

    // Create order in the database
    const order = await Order.create({ user: userId, food: foodId, quantity });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Order creation failed" });
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

const getOrdersByDate = async (req, res) => {
  try {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

    const orders = await Order.find({
      date: { $gte: startDate, $lt: endDate },
    })
      .populate("food")
      .populate("user");

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders by date:", error);
    res.status(500).json({ error: "Failed to fetch orders by date" });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

    const orders = await Order.find({
      user: userId,
      date: { $gte: startDate, $lt: endDate },
    }).populate("food");

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders by user:", error);
    res.status(500).json({ error: "Failed to fetch orders by user" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    await Order.findByIdAndDelete(orderId);

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Failed to delete order" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrdersByDate,
  getOrdersByUser,
  deleteOrder,
};
