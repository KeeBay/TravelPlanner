const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authController')

authRouter.post("/registration", authController.authRegisterPostController)
authRouter.post("/login", authController.authLoginPostController)
module.exports = authRouter;
