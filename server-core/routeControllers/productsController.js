const db = require("./../connection");
const express = require("express");
const router = express.Router();
const tokenControl = require("./../middlewares/tokenControl");

router.get("/:currentUserId", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let rawProductsTable;
  let wishedProductIds;
  // fill products table with wished table, setting wished flag to either Y or N and send back that response
  // response is the product table for the specific user, wished flag set
  db.query(` SELECT * FROM products ;`)
    .then((response) => {
      rawProductsTable = response[0];
      //console.log(rawProductsTable);
      let wishResponse = db.query(
        ` SELECT product_id FROM wish WHERE user_id = ${req.params.currentUserId} ;`
      );
      return wishResponse;
    })
    .then((wishResponse) => {
      wishedProductIds = wishResponse[0].map((w) => w.product_id);
    })
    .then(() => {
      //console.log(rawProductsTable, wishedProductIds);

      let responseProductsTable = [...rawProductsTable];
      responseProductsTable.forEach((p) => {
        wishedProductIds.includes(p.id) ? (p.wished = "Y") : (p.wished = "N");
      });

      //console.log("responseProductsTable", responseProductsTable);
      res.status(200).send(responseProductsTable);
    })
    .catch((err) => res.status(500).send(err));
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

// UPDATE WISH TABLE
router.patch("/:id", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.query(
    ` SELECT * FROM wish WHERE product_id = ${req.params.id} AND user_id = ${req.body.currentUserId};`
  )
    .then((response) => {
      if (response[0].length === 0) {
        // if record does not exist yet, create it
        return db.query(
          ` INSERT INTO wish ( user_id, product_id ) VALUES ( ${req.body.currentUserId}, ${req.params.id} );`
        );
      } else {
        // if record already exists, delete it
        return db.query(
          ` DELETE FROM wish WHERE product_id = ${req.params.id} AND user_id = ${req.body.currentUserId};`
        );
      }
    })
    .then((response) => {
      // return products table for current user, alredy updated with wished status

      res.status(200).send(response[0]);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

module.exports = router;
