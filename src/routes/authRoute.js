const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authController')

authRouter.post("/registration", authController.authRegisterPostController)

module.exports = authRouter;
