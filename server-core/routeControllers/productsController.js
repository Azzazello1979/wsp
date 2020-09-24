const db = require("./../connection");
const express = require("express");
const router = express.Router();
const tokenControl = require("./../middlewares/tokenControl");

router.get("/", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.query(` SELECT * FROM products ;`)
    .then((products) => {
      return res.status(200).send(products[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/", tokenControl, (req, res) => {
  console.log(req.body);
});

module.exports = router;
