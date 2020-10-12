const express = require("express");
const router = express.Router();
const tokenControl = require("../middlewares/tokenControl");
// import controllers...
const cartController = require("./../controllers/cart");

// GET user's saved cart
router.get("/:user_id", tokenControl, cartController.getUserCart);
// POST add new product to user's cart
router.post("/", tokenControl, cartController.addNewProductToCart);
// PATCH update product amount OR shipping method in user's cart
router.patch(
  "/:id",
  tokenControl,
  cartController.updateProductAmountORshippingMethod
);

module.exports = router;
