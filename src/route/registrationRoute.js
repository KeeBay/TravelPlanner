//Express importálása
const express = require('express');

//A controller és a Router importálása, inicializálása
const registrationController = require("../controller/registrationController");
const registrationRouter = express.Router();

//Route-ok létrehozása
registrationRouter.put("/registration", registrationController.registrationPUTController);

module.exports = registrationRouter;