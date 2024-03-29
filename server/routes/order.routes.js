const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUnfinishedOrders,
  deleteOrder,
  getUnfinishedOrdersByUser,
  finishOrder,
  getCompletedOrdersByUser,
  deleteUnfinishedOrders,
} = require("../controllers/order.controller");

// Order routes
router.post("/splitwise", finishOrder);
router.post("/", createOrder);
router.get("/", getUnfinishedOrders);
router.get("/user/:userId", getUnfinishedOrdersByUser);
router.get("/completed/user/:userId", getCompletedOrdersByUser);
router.delete("/:orderId/food/:foodId", deleteOrder);
router.delete("/", deleteUnfinishedOrders);

module.exports = router;
