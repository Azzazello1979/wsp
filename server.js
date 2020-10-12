"use strict";

// module imports
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const PORT = process.env.PORT;

// config multer storage
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

// config multer filter
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

// require routes...
const usersRoute = require("./server-core/routes/users");
const productsRoute = require("./server-core/routes/products");
const productCategoriesRoute = require("./server-core/routes/productCategories");
const cartRoute = require("./server-core/routes/cart");

/****** middlewares chain starts ******/

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  multer({ storage: multerStorage, fileFilter: multerFileFilter }).single(
    "image"
  )
);
app.use("/public", express.static(path.join(__dirname + "/public")));

// routes...
app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/categories", productCategoriesRoute);
app.use("/cart", cartRoute);

/****** middlewares chain ends ******/

// server listen...
app.listen(PORT, () => {
  console.log("OK...express listening on " + PORT);
});
