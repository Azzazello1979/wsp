const db = require("./../connection");
const express = require("express");
const router = express.Router();
const tokenControl = require("./../middlewares/tokenControl");

router.get("/:user_id", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.query(
    ` SELECT product_id FROM cart WHERE user_id = ${req.params.user_id} ;`
  )
    .then((response) =>
      res.status(200).send(response[0].map((e) => e.product_id))
    )
    .catch((err) => res.status(500).send(err));
});

router.post("/", tokenControl, (req, res) => {
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
