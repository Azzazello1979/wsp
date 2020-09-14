// module imports
const express = require("express");
const app = express();
const dotenv = require("dotenv"); // process .env files
dotenv.config();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT;

// use middlewares...
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require routeControllers
const usersRoute = require("./routeControllers/usersController");

// use routeControllers
app.use("/users", usersRoute);
