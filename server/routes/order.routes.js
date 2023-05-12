const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getOrdersByDate } = require("../controllers/order.controller");

// Order routes
router.post("/", createOrder);
router.get("/", getOrdersByDate);

module.exports = router;
