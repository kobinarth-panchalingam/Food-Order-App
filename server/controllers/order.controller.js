const Order = require("../models/order.model");
const { createDebt } = require("../utils/splitwise");

// Controller to create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, orderList, orderPlace } = req.body;

    // Check if there are any unfinished orders for the user
    const unfinishedOrder = await Order.findOne({ user: userId, isFinished: false });

    if (unfinishedOrder) {
      if (unfinishedOrder.orderPlace !== orderPlace) {
        return res.status(400).json({ error: "You already have an unfinished order from a different place" });
      }
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
        orderPlace: orderPlace,
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
  const { orderPlace } = req.query;
  const isFinished = req.query.isFinished === "true";
  try {
    const orders = await Order.find({
      orderPlace,
      isFinished,
    })
      .populate("orderList.food")
      .populate("user");

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get orders by user
const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const isFinished = req.query.isFinished == "true";
    const limit = isFinished ? 10 : null;

    const orders = await Order
      .find({
        user: userId,
        isFinished,
      })
      .limit(limit)
      .sort({ updatedAt: -1 })
      .populate("orderList.food");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching unfinished orders by user:", error);
    res.status(500).json({ error: "Failed to fetch unfinished orders by user" });
  }
};

//controller to delete all unfinished orders
const deleteUnfinishedOrders = async (req, res) => {
  try {
    const { orderPlace } = req.body;

    const unfinishedOrders = await Order.deleteMany({
      isFinished: false,
      orderPlace: orderPlace,
    });

    res.status(200).json(unfinishedOrders);
  } catch (error) {
    console.error("Error deleting unfinished orders:", error);
    res.status(500).json({ error: "Failed to delete unfinished orders" });
  }
};

// Controller to delete an order or a food item from an order
const deleteOrder = async (req, res) => {
  try {
    const { orderId, foodId } = req.params;

    // Find the order by orderId
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (foodId === "all") {
      await Order.findByIdAndDelete(orderId);
      return res.json({ message: "Order deleted successfully" });
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

    res.status(200).json({ message: "Food item deleted successfully", order });
  } catch (error) {
    console.error("Error deleting food item:", error);
    res.status(500).json({ error: "Failed to delete food item" });
  }
};

// TODO: have to refactor
const finishOrder = async (req, res) => {
  try {
    const { splitwiseData, from, offerPrice } = req.body;

    const discount = offerPrice ? Math.floor(offerPrice / splitwiseData.length) : 0;
    const orderIds = splitwiseData.map((data) => data.orderId);
    const orders = await Order.find({ _id: { $in: orderIds } })
      .populate("orderList.food")
      .populate("user")
      .lean();

    var amount = 0;
    let users = [];
    const shares = orders
      .map((order) => {
        const totalPrice = order.orderList.reduce((acc, orderItem) => acc + orderItem.food.price * orderItem.quantity, 0);
        order.totalPrice = totalPrice - discount;
        amount += order.totalPrice;
        return order;
      })
      .map((order) => {
        users.push(String(order.user.splitwiseId));
        return {
          user_id: order.user.splitwiseId,
          paid_share: order.user.splitwiseId === Number(from) ? amount : 0,
          owed_share: order.totalPrice,
        };
      });
    if (!users.includes(String(from))) {
      shares.push({
        user_id: from,
        paid_share: amount,
        owed_share: 0,
      });
    }

    // Perform a bulk update to update all the orders at once
    const bulkUpdateOps = orders.map((order) => ({
      updateOne: {
        filter: { _id: order._id },
        update: {
          $set: {
            isFinished: true,
          },
        },
      },
    }));

    try {
      const description = "Dinner " + orders[0].orderPlace;
      await createDebt(shares, description, amount);
      await Order.bulkWrite(bulkUpdateOps);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Orders finished successfully" });
  } catch (error) {
    console.error("Error finishing orders:", error);
    res.status(500).json({ error: error.message });
  }
};;

module.exports = {
  createOrder,
  getOrders,
  getOrdersByUser,
  deleteOrder,
  finishOrder,
  deleteUnfinishedOrders,
};
