const express = require("express");
const router = express.Router();
const { updateOrderPermision, getOrderPermision } = require("../controllers/setting.controller");

router.get("/", getOrderPermision);
router.patch("/", updateOrderPermision);

module.exports = router;
