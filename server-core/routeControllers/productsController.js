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
  res.setHeader("Content-Type", "application/json");
  console.log(req.body);
  const { category, name, price, description } = req.body;
  const createPath = () => {
    return `public/categories/${category}/${req.file.originalname}`;
  };
  db.query(
    `INSERT INTO products (category, name, price, description, mainIMGurl) VALUES ( '${category}', '${name}', ${price}, '${description}', '${createPath()}' );`
  )
    .then((response) => {
      const OKpacket = response[0];
      if (OKpacket.warningCount === 0) {
        res.status(200).json({ message: "OK, product saved to DB" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Some error occured while trying to save product to DB!",
        error: err,
      });
    });
});

module.exports = router;
