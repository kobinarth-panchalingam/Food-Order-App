const Order = require("../models/order.model");

// Controller to create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, orderList, orderNumber } = req.body;

    // Create an order document
    const order = new Order({
      user: userId,
      orderList: orderList.map((orderItem) => ({
        food: orderItem._id,
        quantity: orderItem.quantity,
      })),
      orderNumber: orderNumber,
    });

    // Save the order document to the database
    const result = await order.save();

    res.status(201).json({ success: true, result });
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

const getUnfinishedOrders = async (req, res) => {
  try {
    const unfinishedOrders = await Order.find({
      isFinished: false,
    })
      .populate("food")
      .populate("user");

    res.json(unfinishedOrders);
  } catch (error) {
    console.error("Error fetching unfinished orders:", error);
    res.status(500).json({ error: "Failed to fetch unfinished orders" });
  }
};

const getUnfinishedOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const unfinishedOrders = await Order.find({
      user: userId,
      isFinished: false,
    }).populate("food");

    res.json(unfinishedOrders);
  } catch (error) {
    console.error("Error fetching unfinished orders by user:", error);
    res.status(500).json({ error: "Failed to fetch unfinished orders by user" });
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
  getUnfinishedOrders,
  getUnfinishedOrdersByUser,
  deleteOrder,
};
