const express = require("express");
const router = express.Router();
const tokenControl = require("../middlewares/tokenControl");
const productsController = require("./../controllers/products");

// GET products table for user, wished status of products already updated
router.get(
  "/:currentUserId",
  tokenControl,
  productsController.getProductsTableForUser
);

// POST save new product to DB
router.post("/", tokenControl, productsController.saveNewProduct);

// PATCH update wish table of user
router.patch("/:id", tokenControl, productsController.updateWishTable);

module.exports = router;
