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
  // { user_id: 1, product_id: 17, amount: 1 }
  db.query(
    ` SELECT * FROM cart WHERE user_id = ${req.body.user_id} AND product_id = ${req.body.product_id} ;`
  )
    .then((response) => {
      if (response[0].length === 0) {
        // if no such record exists, insert new record
        return db.query(
          ` INSERT INTO cart ( user_id, product_id, amount ) VALUES ( ${req.body.user_id}, ${req.body.product_id}, ${req.body.amount} );`
        );
      } else {
        // else, only update amount
        return db.query(
          ` UPDATE cart SET amount = amount + 1 WHERE user_id = ${req.body.user_id} AND product_id = ${req.body.product_id} ;`
        );
      }
    })
    .then((response) => {
      if (response[0].insertId !== 0) {
        res.status(200).json({ message: "OK, new record inserted!" });
      } else {
        res.status(200).json({ message: "OK, amount updated!" });
      }
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
