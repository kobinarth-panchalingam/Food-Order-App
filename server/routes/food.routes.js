const express = require("express");
const router = express.Router();
const { createFood, getFoodItems } = require("../controllers/food.controller");

router.get("/", getFoodItems);
router.post("/", createFood);

module.exports = router;
