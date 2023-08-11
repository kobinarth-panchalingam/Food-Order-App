const express = require("express");
const router = express.Router();
const { updateOrderPermision, getOrderPermision } = require("../controllers/setting.controller");

// Food routes
router.patch("/", updateOrderPermision);
router.get("/", getOrderPermision);

module.exports = router;
