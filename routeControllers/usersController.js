const db = require("./../server-core/connection");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.query(`SELECT * FROM users`)
    .then((result) => {
      console.log(result[0]);
    })
    .catch((e) => {
      res.status(500).send("Some SQL error: ", e);
      return console.log("Some SQL error: ", e);
    });
});

module.exports = router;
