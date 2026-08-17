const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authController');
const googleMiddleware = require('../middleware/googleTokenMiddleware');

authRouter.post("/registration", authController.authRegisterPostController);
authRouter.post("/login", authController.authLoginPostController);
authRouter.post("/google", googleMiddleware, authController.googleLogin);
module.exports = authRouter;
