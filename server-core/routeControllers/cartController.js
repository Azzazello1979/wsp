const db = require("./../connection");
const express = require("express");
const router = express.Router();
const tokenControl = require("./../middlewares/tokenControl");

router.post("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  // { user_id: 1, cart: [17,18,19] }
  const productIds = req.body.cart;

  let insertPromises = [];

  productIds.forEach((productId) => {
    let insertPromise = db.query(
      ` INSERT INTO cart (user_id, product_id) VALUES ( ${req.body.user_id}, ${productId} ) ;`
    );
    insertPromises.push(insertPromise);
  });

  Promise.all(insertPromises)
    .then((reply) => {
      res.status(200).json({ message: "OK, cart updated!" });
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

module.exports = router;
