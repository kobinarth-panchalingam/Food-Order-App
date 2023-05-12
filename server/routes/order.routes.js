const express = require("express");
const router = express.Router();
const { createOrder, getOrdersByDate, deleteOrder, getOrdersByUser } = require("../controllers/order.controller");

// Order routes
router.post("/", createOrder);
router.get("/", getOrdersByDate);
router.get("/user/:userId", getOrdersByUser);
router.delete("/:orderId", deleteOrder);

module.exports = router;
