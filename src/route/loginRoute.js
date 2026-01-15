const express = require('express');

const loginController = require('../controller/loginController');
const authMiddleware = require('../middlewares/authMiddleware');
const loginRouter = express.Router();

loginRouter.post("/login", loginController.loginPostController);
loginRouter.post("/logout", authMiddleware ,loginController.logOutPostController);

module.exports = loginRouter;