const express = require("express");
const router = express.Router();
const { addToCart, getCart } = require("../controllers/cartController.js");

// @route POST /cart
router.post("/", addToCart);

// @route GET /cart/:userId
router.get("/:userId", getCart);

module.exports = router;
