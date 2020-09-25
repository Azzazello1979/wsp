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
  const { category, name, price, description, createdFileName } = req.body;
  const createPath = () => {
    return `public/categories/${category}/${createdFileName}`;
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

router.patch("/:id", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  //console.log(req.params);
  db.query(` SELECT wished FROM products WHERE id = ${req.params.id}  ;`)
    .then((res) => {
      let currentWishedStatus = res[0][0].wished;
      //console.log("current wished status:", currentWishedStatus);
      return currentWishedStatus;
    })
    .then((currentWishedStatus) => {
      const toggleWishStatus = () => {
        return currentWishedStatus === "N" ? "Y" : "N";
      };
      return db.query(
        ` UPDATE products SET wished = '${toggleWishStatus()}' WHERE id = ${
          req.params.id
        } ;`
      );
    })
    .then((response) => {
      console.log(response[0].warningCount);
      if (response[0].warningCount === 0) {
        res.status(200).json({ message: "OK, wished status updated" });
      } else {
        throw new Error("warning count not zero");
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Error when selecting wished status from DB!",
        error: err,
      });
    });
});

module.exports = router;
