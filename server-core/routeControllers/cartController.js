const db = require("./../connection");
const express = require("express");
const router = express.Router();
const tokenControl = require("./../middlewares/tokenControl");

router.get("/:user_id", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.query(
    ` SELECT id FROM cart WHERE user_id = ${req.params.user_id} AND amount = 0 ;`
  )
    .then((response) => {
      if (response[0].length !== 0) {
        // there is at least 1 record with 0 amount, run delete
        return db.query(
          ` DELETE FROM cart WHERE user_id = ${req.params.user_id} AND amount = 0 ;`
        );
      }
    })
    .then(() => {
      return db.query(
        ` SELECT product_id, amount FROM cart WHERE user_id = ${req.params.user_id} ;`
      );
    })
    .then((response) => res.status(200).send(response[0]))
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
        // else, only update amount ... REMOVE THIS, sending patch instead
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

router.patch("/:id", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.body.selectedShippingOptionId) {
    // update selected shipping method, req.params.id is user_id

    db.query(
      ` UPDATE cart SET selectedShippingMethod = ${req.body.selectedShippingOptionId} WHERE user_id = ${req.params.id} ;`
    )
      .then((response) =>
        res.status(200).json({
          message: "OK, selected shipping method updated for user's cart.",
        })
      )
      .catch((err) => res.status(500).send(err));
  }

  if (req.body.change) {
    // update product amounts, req.params.id is product_id
    const operation = () => {
      return req.body.change === "plus" ? "+" : "-";
    };
    db.query(
      ` UPDATE cart SET amount = amount ${operation()} 1 WHERE product_id = ${
        req.params.id
      } ;`
    )
      .then(() => {
        res.status(200).json({ message: "OK, updated amount!" });
      })
      .catch((err) => res.status(500).send(err));
  }
});

module.exports = router;
