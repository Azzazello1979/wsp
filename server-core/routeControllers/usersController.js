const db = require("./../connection");
const express = require("express");
const router = express.Router();
const hash = require("sha256");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const SALT = process.env.SALT;
const tokenControl = require("./../middlewares/tokenControl");

// LIST ALL USERS
router.get("/", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.query(`SELECT * FROM users`)
    .then((results) => {
      if (results[0].length !== 0) {
        return res.status(200).send(results[0]);
      } else {
        return res.status(404).json({ message: "No users in database!" });
      }
    })
    .catch((e) => {
      return res.status(500).send(e);
    });
});

// REGISTER OR LOGIN
router.post("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (
    req.body.name &&
    req.body.password &&
    req.body.intent &&
    req.body.intent === "register"
  ) {
    // REGISTER USER ...
    db.query(`SELECT * FROM users WHERE name = '${req.body.name}';`)
      .then((results) => {
        if (results[0].length !== 0) {
          return res.status(400).json({
            message: "Such username already exists, please choose another one!",
          });
        } else {
          let hashedPassword = hash(req.body.password + SALT);
          return db.query(
            `INSERT INTO users (name, password) VALUES ('${req.body.name}', '${hashedPassword}');`
          );
        }
      })
      .then((OKPacket) => {
        if (OKPacket[0].affectedRows === 1) {
          let token = jwt.sign(
            { userId: OKPacket[0].insertId, userName: req.body.name },
            SECRET,
            { expiresIn: "1d" }
          );
          return res.status(200).json({ token: token });
        }
      })
      .catch((e) => {
        return res.status(500).send(e);
      });
  } else if (
    req.body.name &&
    req.body.password &&
    req.body.intent &&
    req.body.intent === "login"
  ) {
    // LOGIN USER ...
    db.query(` SELECT * FROM users WHERE name = '${req.body.name}' ;`)
      .then((response) => {
        if (response[0].length !== 0) {
          let storedHashedPassword = response[0][0].password;
          let incomingPassword = req.body.password;

          if (storedHashedPassword === hash(incomingPassword + SALT)) {
            let token = jwt.sign(
              { userId: response[0][0].id, userName: response[0][0].name },
              SECRET,
              { expiresIn: "1d" }
            );
            return res.status(200).send({ token });
          } else {
            return res.status(400).json({
              message: "This password is not correct for this username!",
            });
          }
        } else {
          return res
            .status(404)
            .json({ message: "There is no such username!" });
        }
      })
      .catch((e) => {
        return res.status(500).send(e);
      });
  } else {
    return res.status(400).json({
      message:
        "credentials missing from request body, name, password, intent, or intent is neither login nor register",
    });
  }
});

module.exports = router;
