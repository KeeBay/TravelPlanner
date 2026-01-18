const express = require('express');

const hotelController = require("../controller/hotelSearchController");

const hotelRouter = express.Router();

hotelRouter.get("/hotels", hotelController.hotelSearchController);

module.exports = hotelRouter;