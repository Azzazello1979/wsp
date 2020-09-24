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
    cb(null, "public/categories/" + req.body.category); // cb(error, destination)
  },
  filename: (req, file, cb) => {
    const createdFileName = Date.now() + "-" + file.originalname;
    req.body.createdFileName = createdFileName;
    cb(null, createdFileName); // cb(error, filename)
  },
});

const multerFileFilter = (req, file, cb) => {
  console.log("file:", file);
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/JPEG" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); // cb(error, store file)
  } else {
    cb(null, false); // cb(error, do not store file)
    console.log("Not an image file, won't save!");
  }
};

// use middlewares...
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  multer({ storage: multerStorage, fileFilter: multerFileFilter }).single(
    "image"
  )
);
app.use("/public", express.static(path.join(__dirname + "/public")));

// require routeControllers
const usersRoute = require("./server-core/routeControllers/usersController");
const productsRoute = require("./server-core/routeControllers/productsController");
const productCategoriesRoute = require("./server-core/routeControllers/productCategoriesController");

// use routeControllers
app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/categories", productCategoriesRoute);

app.listen(PORT, () => {
  console.log("OK...express listening on " + PORT);
});
