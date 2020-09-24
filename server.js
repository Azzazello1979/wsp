"use strict";

// module imports
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const PORT = process.env.PORT;

// config multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "rawimages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// use middlewares...
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer({ storage: multerStorage }).single("image"));
app.use("/public", express.static(path.join(__dirname + "/public")));

// require routeControllers
const usersRoute = require("./server-core/routeControllers/usersController");
const productsRoute = require("./server-core/routeControllers/productsController");

// use routeControllers
app.use("/users", usersRoute);
app.use("/products", productsRoute);

app.listen(PORT, () => {
  console.log("OK...express listening on " + PORT);
});
