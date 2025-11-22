const express = require('express');

const loginController = require('../controller/loginController');
const loginRouter = express.Router();

loginRouter.post("/login", loginController.loginPostController);

module.exports = loginRouter;