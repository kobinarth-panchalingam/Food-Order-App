const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUnfinishedOrders,
  deleteOrder,
  getOrdersByUser,
  finishOrder,
  deleteUnfinishedOrders,
  getOrders,
} = require("../controllers/order.controller");

router.get("/", getOrders);
router.get("/:userId", getOrdersByUser);
router.post("/finish", finishOrder);
router.post("/", createOrder);
router.delete("/", deleteUnfinishedOrders);
router.delete("/:orderId/food/:foodId", deleteOrder);

module.exports = router;
