const express = require("express");
const router = express.Router();
const tokenControl = require("../middlewares/tokenControl");
const productsController = require("./../controllers/products");

// GET product categories
router.get("/", tokenControl, productsController.getProductCategories);

module.exports = router;
