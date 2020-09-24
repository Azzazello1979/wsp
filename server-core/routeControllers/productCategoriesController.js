const db = require("../connection");
const express = require("express");
const router = express.Router();
const tokenControl = require("../middlewares/tokenControl");

router.get("/", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.query(`SELECT * FROM categories;`)
    .then((result) => {
      if (result[0].length > 0) {
        res.status(200).send(result[0]);
      } else {
        throw new Error("There are no categories in the DB");
      }
    })
    .catch((err) => {
      return console.log(err);
    });
});

module.exports = router;
