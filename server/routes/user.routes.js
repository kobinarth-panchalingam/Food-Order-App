const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUserByIndex, updateOrderPermision } = require("../controllers/user.controller");

router.get("/", getUsers);
router.get("/:index", getUserByIndex);
router.post("/", createUser);
router.patch("/", updateOrderPermision);

module.exports = router;
