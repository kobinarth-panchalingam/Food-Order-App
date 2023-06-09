const Order = require("../models/order.model");
const { createDebt } = require("../splitwise_api/splitwise");

// Controller to create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, orderList } = req.body;

    // Check if there are any unfinished orders for the user
    const unfinishedOrder = await Order.findOne({ user: userId, isFinished: false });

    if (unfinishedOrder) {
      // Add the new order items to the existing order list
      unfinishedOrder.orderList.push(
        ...orderList.map((orderItem) => ({
          food: orderItem._id,
          quantity: orderItem.quantity,
        }))
      );

      // Save the updated unfinished order
      await unfinishedOrder.save();

      res.status(200).json({ success: true, result: unfinishedOrder });
    } else {
      // Find the maximum orderNumber value in the database
      const maxOrderNumber = await Order.findOne().sort({ orderNumber: -1 }).limit(1).select("orderNumber").lean();

      const nextOrderNumber = maxOrderNumber ? maxOrderNumber.orderNumber + 1 : 1;

      // Create a new order document
      const order = new Order({
        user: userId,
        orderList: orderList.map((orderItem) => ({
          food: orderItem._id,
          quantity: orderItem.quantity,
        })),
        orderNumber: nextOrderNumber,
      });

      // Save the order document to the database
      const result = await order.save();

      res.status(201).json({ success: true, result });
    }
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
      .populate("orderList.food")
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
    }).populate("orderList.food");
    res.json(unfinishedOrders);
  } catch (error) {
    console.error("Error fetching unfinished orders by user:", error);
    res.status(500).json({ error: "Failed to fetch unfinished orders by user" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId, foodId } = req.params;

    // Find the order by orderId
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Find the index of the food item in the order's orderList
    const foodIndex = order.orderList.findIndex((item) => item._id.toString() === foodId);

    if (foodIndex === -1) {
      return res.status(404).json({ error: "Food item not found in the order" });
    }

    // Remove the food item from the order's orderList
    order.orderList.splice(foodIndex, 1);

    // Check if the orderList is empty
    if (order.orderList.length === 0) {
      // If orderList is empty, delete the entire document from the collection
      await Order.findByIdAndDelete(orderId);
      return res.json({ message: "Order deleted successfully" });
    }

    // Save the updated order
    await order.save();

    res.json({ message: "Food item deleted successfully", order });
  } catch (error) {
    console.error("Error deleting food item:", error);
    res.status(500).json({ error: "Failed to delete food item" });
  }
};

const finishOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { description, from } = req.body;

    const order = await Order.findByIdAndUpdate(orderId, { isFinished: true }, { new: true }).populate("orderList.food").populate("user");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    let totalPrice = 0;
    order.orderList.forEach((orderItem) => {
      totalPrice += orderItem.food.price * orderItem.quantity;
    });

    // Create a description based on food names in the order list
    const foodNames = order.orderList.map((item) => item.food.name);
    const firstName = order.user.name.split(" ")[0];
    const newDescription = `${firstName}-${description}`;

    // Call the createDebt function with the necessary parameters
    const result = await createDebt(from, order.user.splitwiseId, newDescription, totalPrice);

    res.json({ message: "Order finished successfully", order });
  } catch (error) {
    console.error("Error finishing order:", error);
    res.status(500).json({ error: "Failed to finish order" });
  }
};

const getCompletedOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId, isFinished: true }).sort({ updatedAt: -1 }).populate("orderList.food");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching completed orders" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getUnfinishedOrders,
  getUnfinishedOrdersByUser,
  deleteOrder,
  finishOrder,
  getCompletedOrdersByUser,
};
