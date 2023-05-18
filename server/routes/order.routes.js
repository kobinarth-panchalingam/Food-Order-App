const express = require("express");
const router = express.Router();
const { createOrder, getUnfinishedOrders, deleteOrder, getUnfinishedOrdersByUser } = require("../controllers/order.controller");

// Order routes
router.post("/", createOrder);
router.get("/", getUnfinishedOrders);
router.get("/user/:userId", getUnfinishedOrdersByUser);
router.delete("/:orderId", deleteOrder);

module.exports = router;
