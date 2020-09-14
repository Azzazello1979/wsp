const db = require("./../connection");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.query(`SELECT * FROM users`)
    .then((result) => {
      if (result[0].length !== 0) {
        return res.status(200).send(result[0]);
      } else {
        return res.status(404).json({ message: "No users in database!" });
      }
    })
    .catch((e) => {
      return res.status(500).send(e);
    });
});

module.exports = router;
