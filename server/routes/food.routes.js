const express = require("express");
const router = express.Router();
const { createFood, getFoodItems } = require("../controllers/food.controller");

router.post("/", createFood);
router.get("/", getFoodItems);

module.exports = router;
