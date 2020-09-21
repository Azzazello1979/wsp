"use strict";

// module imports
const express = require("express");
const app = express();
require("dotenv").config(); // process .env files
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT;

// use middlewares...
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require routeControllers
const usersRoute = require("./server-core/routeControllers/usersController");
const productsRoute = require("./server-core/routeControllers/productsController");

// use routeControllers
app.use("/users", usersRoute);
app.use("/products", productsRoute);

app.listen(PORT, () => {
  console.log("OK...express listening on " + PORT);
});
