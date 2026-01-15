const express = require('express');

const registrationController = require("../controller/registrationController");
const registrationRouter = express.Router();

registrationRouter.post("/registration", registrationController.registrationPOSTController);

module.exports = registrationRouter;